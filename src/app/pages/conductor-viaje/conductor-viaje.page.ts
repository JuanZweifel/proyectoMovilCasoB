import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { firstValueFrom } from 'rxjs';

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
    auto: {
      marca: '',
      modelo: '',
      patente: ''
    }
  }


  constructor(private router: Router, private storage: Storage, private route: ActivatedRoute,
    private firestoreService: FirestoreService) {
    this.route.queryParams.subscribe(params => {
      this.viajeid = params['viajeid'];
    });



  }

  async ngOnInit() {
    this.sesion = await this.storage.get('sesion')
    this.firestoreService.getViajePorId(this.viajeid).subscribe((viaje: any) => {
      // Aquí puedes utilizar el objeto del viaje obtenido por su ID
      //console.log('Viaje por ID:', viaje);
      this.viaje = viaje;
      this.datosCargados = true;
    });
  }


  async onClick() {
    this.sesion.solicitado = ""

    let modusuario = await this.firestoreService.addUsuario(this.sesion);
    if (modusuario) {
      await this.storage.set('sesion', this.sesion);

      console.log('REC');
    } else {

      console.log('Error REC');
    }

    this.eliminarUsuarios()


    this.storage.remove('viajeofrecido')
    this.router.navigate(["tabs/home"])
  }

  ngAfterViewInit() {
    console.log(this.viajeid)
  }


  volver() {
    this.router.navigateByUrl("tabs/ofrecer-viaje")
  }


  async eliminarUsuarios() {
    this.correos = this.viaje.clientes;
  
    // Recorre todos los correos para modificar los datos de cada usuario
    for (let correo of this.correos) {
      try {
        const usuario = await firstValueFrom(this.firestoreService.obtenerUsuario(correo));
  
        if (usuario) {
          usuario.solicitado = "";
          // Ahora, debes llamar a un método para actualizar los datos del usuario.
          // Puedes utilizar el método actualizarUsuario que deberías agregar en tu servicio.
          await this.firestoreService.actualizarUsuario(correo, { solicitado: usuario });
        }
      } catch (error) {
        console.error(`Error al obtener o actualizar el usuario ${correo}:`, error);
      }
    }
  }



  //Como se extraen estos datos del storage a pesar de que la vista valida de que si esta el elemento, no alcanza a abrir
  //el modal con los datos, por lo que despues de que carguen la información del storage se fuerza la visualización del 
  //modal con los datos del viaje
  // ngAfterViewInit() {
  //   this.route.queryParams.subscribe((params) => {
  //     const modal = document.querySelector('ion-modal');
  //     if (modal) {
  //       modal.componentProps = {
  //         viaje: this.viaje,
  //       };
  //       modal.present();
  //     }
  //   });
  // }



}
