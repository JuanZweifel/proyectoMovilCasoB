import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { firstValueFrom } from 'rxjs';
import { IonModal, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-conductor-viaje',
  templateUrl: './conductor-viaje.page.html',
  styleUrls: ['./conductor-viaje.page.scss'],
})
export class ConductorViajePage implements OnInit {

  viajeid: any
  sesion: any
  viaje: any
  correos: string[] = []
  datosCargados: boolean = false;

  usuario: Usuario = {
    email: '',
    name: '',
    phone: '',
    password: '',
    solicitado: '',
    ofrecido: '',
    asientos: 0,
    auto: {
      marca: '',
      modelo: '',
      patente: ''
    }
  }


  constructor(private router: Router,
    private storage: Storage,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private modalController: ModalController) {
    this.route.queryParams.subscribe(params => {
      this.viajeid = params['viajeid'];
    });

  }

  async abrirModal() {
    const modal = document.querySelector('ion-modal');
      if (modal) {
        modal.present();
      };
  }




  async ngOnInit() {
    this.sesion = await this.storage.get('sesion')
    await this.firestoreService.getViajePorId(this.viajeid).subscribe((viaje: any) => {
      // Aquí puedes utilizar el objeto del viaje obtenido por su ID
      console.log('Viaje por ID:', viaje);
      this.viaje = viaje;
      this.datosCargados = true;
    });
  }


  async onClick() {
    this.sesion.ofrecido = ""

    let modusuario = await this.firestoreService.addUsuario(this.sesion);
    if (modusuario) {
      await this.storage.set('sesion', this.sesion);

      console.log('REC');
    } else {

      console.log('Error REC');
    }

    
    //Eliminar usuarios
    this.correos = this.viaje.clientes;

    // Recorre todos los correos para modificar los datos de cada usuario
    for (let correo of this.correos) {
      try {
        this.usuario = await firstValueFrom(this.firestoreService.obtenerUsuario(correo));
        console.log("USER :", this.usuario)
        if (this.usuario) {
          this.usuario.solicitado = "";
          // Ahora, debes llamar a un método para actualizar los datos del usuario.
          // Puedes utilizar el método actualizarUsuario que deberías agregar en tu servicio.

          let modusu = await this.firestoreService.addUsuario(this.usuario);
          if (modusu) {
            console.log('Se actualizaron los datos del usuario');
          } else {
            console.log('No se actualizaron los datos del usuario');
          }

        }
      } catch (error) {
        console.error(`Error al obtener o actualizar el usuario ${correo}:`, error);
      }
    }

    this.viaje.estado = "Finalizado"
    await this.firestoreService.actualizarViaje(this.viaje.id, this.viaje);



    this.storage.remove('viajeofrecido')
    this.router.navigate(["tabs/home"])
  }



  volver() {
    this.router.navigateByUrl("tabs/perfil")
  }




  async eliminarUsuarios() {
  
  }





}

1