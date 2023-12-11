import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { firstValueFrom } from 'rxjs';
import { IonModal, ModalController } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

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

  ionViewDidLeave(){
    if (this.map) {
      this.map.destroy();
    }
  }




  async ngOnInit() {

  }

  async ionViewWillEnter(){
    await this.firestoreService.getViajePorId(this.viajeid).subscribe((viaje: any) => {
      // Aquí puedes utilizar el objeto del viaje obtenido por su ID
      console.log('Viaje por ID:', viaje);
      this.viaje = viaje;
      this.datosCargados = true;
    });
    this.sesion = await this.storage.get('sesion')
    this.createMap();
  }

  async ionViewDidEnter(){
    await this.map.setCamera({
      coordinate: {
        lat: this.viaje.lat_destino,
        lng: this.viaje.lng_destino
      }
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
    //Google maps
    @ViewChild('map', { static: true })
    mapRef!: ElementRef<HTMLElement>;
    map!: GoogleMap
  
  
    async createMap() {
      this.map = await GoogleMap.create({
        id: 'my-map', // Unique identifier for this map instance
        element: this.mapRef.nativeElement, // reference to the capacitor-google-map element
        apiKey: environment.mapsKey, // Your Google Maps API Key
        config: {
          center: {
          // The initial position to be rendered by the map
          
          lat: this.viaje.lat_destino,
          lng: this.viaje.lng_destino,
          },
          zoom: 17, // The initial zoom level to be rendered by the map
          disableDefaultUI: true,
        },
      })
      this.createMarker();
    }

    async createMarker() {
      const marker = {
        coordinate: {
          lat: this.viaje.lat_destino,
          lng: this.viaje.lng_destino,
        },
        title: 'Destino',
      }
  
      
      await this.map.addMarker(marker);
    }


}

1