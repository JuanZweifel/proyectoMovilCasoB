import { Storage } from '@ionic/storage-angular';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  viajeid:any
  viaje: any
  sesion: any
  asientos: any
  lista: string[] = []

  constructor(private router: Router,
    private modalController: ModalController,
    private storage: Storage,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private alertController:AlertController) { 

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
    this.firestoreService.getViajePorId(this.viajeid).subscribe((viaje: any) => {
      // Aquí puedes utilizar el objeto del viaje obtenido por su ID
      //console.log('Viaje por ID:', viaje);
      this.viaje = viaje;
      if (viaje.estado === 'Finalizado') {
        this.presentAlert("El viaje fue finalizado por el conductor")
        this.router.navigate(['tabs/home']);
      }
    });
    
    this.sesion = await this.storage.get('sesion')
  }

  ionViewDidEnter(){
    this.createMap();
  }

  ionViewWillLeave() {
    this.cerrarModal();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  volver() {
    this.router.navigate(["tabs/home"])
  }

  submitting: boolean = false;
  async onClick() {
    // Evitar clics múltiples si ya se está procesando una solicitud
    if (this.submitting) {
      return;
    }
  
    this.submitting = true; // Establecer la variable de estado a true para indicar que se está enviando una solicitud
  
    try {
      this.sesion.solicitado = this.viaje.id;
      this.sesion.asientos = this.asientos;
  
      let moduser = await this.firestoreService.addUsuario(this.sesion);
  
      if (moduser) {
        await this.storage.set('sesion', this.sesion);
        console.log('Se agregó el viaje a viaje solicitado');
      } else {
        console.log('Error al agregar viaje solicitado al usuario');
      }
  
      this.viaje.clientes.push(this.sesion.email);
  
      //Setear asientos
      let resta = this.viaje.disponibles - this.asientos;
      console.log("RESTA: ", resta);
  
      this.viaje.disponibles = resta;
  
      try {
        await this.firestoreService.actualizarViaje(this.viaje.id, { clientes: this.viaje.clientes, disponibles: this.viaje.disponibles });
        console.log('Viaje actualizado con éxito en Firestore');
      } catch (error) {
        console.error('Error al actualizar el viaje en Firestore:', error);
      }
  
      // Guarda el viaje modificado en el almacenamiento local
      this.storage.set('viaje_pedido', this.viaje);
      this.router.navigate(['recorrido'], {
        queryParams: {
          viajeid: this.sesion.solicitado,
        }
      });
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      this.submitting = false; // Establecer la variable de estado a false después de completar la solicitud
    }
  }
  

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Información',
      message: message,
      buttons: ['OK'],
      backdropDismiss: false,

    });

    await alert.present();
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



