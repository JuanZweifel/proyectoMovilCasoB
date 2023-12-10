import { Storage } from '@ionic/storage-angular';
import { Component, ElementRef, OnInit, Query, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-recorrido',
  templateUrl: './recorrido.page.html',
  styleUrls: ['./recorrido.page.scss'],
})
export class RecorridoPage implements OnInit {
  viajeid: any
  sesion: any
  viaje: any
  datosCargados: boolean = false;
  nuevaListaCorreos: string[] = []
  viajeSubscription: any;


  constructor(private router: Router, private storage: Storage, private route: ActivatedRoute,
    private firestoreService: FirestoreService, private alertController: AlertController) {
    this.route.queryParams.subscribe(params => {
      this.viajeid = params['viajeid'];
    });
  }
  
  
  ionViewDidEnter(){
    this.createMap();
    
  }

  async ngOnInit() {
    this.sesion = await this.storage.get('sesion');

    this.viajeSubscription = this.firestoreService.getViajePorId(this.viajeid).subscribe((viaje: any) => {
      this.viaje = viaje;
      this.datosCargados = true;

      // Puedes realizar la lógica aquí o llamar a otro método
      if (this.viaje.estado === 'Finalizado') {
        console.log("LLEGUE AL FINALIZADO");
        this.presentAlert("El viaje fue finalizado por el conductor");
        console.log("PASE EL PRESENT ALTERT");
        this.sesion.solicitado = "";
        this.storage.set("sesion", this.sesion)
        this.router.navigate(['tabs/home']);
      }
    });
  }

  ionViewWillLeave() {
    if (this.map) {
      this.map.destroy();
    }
    // Cancelar la suscripción al salir de la página
    if (this.viajeSubscription) {
      this.viajeSubscription.unsubscribe();
      this.viajeSubscription = null;
    }
  }
  
  ngOnDestroy() {
    // Cancelar la suscripción al salir del componente
    if (this.viajeSubscription) {
      this.viajeSubscription.unsubscribe();
    }
  }

  async abrirModal() {
    const modal = document.querySelector('ion-modal');
      if (modal) {
        modal.present();
      };
  }

  volver() {
    this.router.navigate(["tabs/home"])
  }

  async onClick() {
    let dispo = this.viaje.disponibles

    dispo = dispo + this.sesion.asientos

    this.viaje.disponibles = dispo


    //Se le elimina el id en solicitado en el store
    this.sesion.solicitado = ""
    this.sesion.asientos = 0

    let modusuario = await this.firestoreService.addUsuario(this.sesion);
    if (modusuario) {
      await this.storage.set('sesion', this.sesion);

      console.log('REC');
    } else {

      console.log('Error REC');
    }

    // Se elimina el correo en la lista de pasajeros del viaje
    let correoAEliminar: string = this.sesion.email;
    // Suponiendo que 'correosviaje' es un array de correos (tipo string)
    let correosviaje: string[] = this.viaje.clientes;
    // Filtrar la lista para excluir el correo que deseas eliminar
    this.nuevaListaCorreos = correosviaje.filter((cliente: string) => cliente !== correoAEliminar);
    // Asignar la nueva lista a 'correosviaje'
    this.viaje.clientes = this.nuevaListaCorreos;
    //Actualiza los datos en el firestore
    await this.firestoreService.actualizarViaje(this.viajeid, this.viaje);
      

    this.storage.remove('viaje_pedido')
    this.router.navigate(["tabs/home"])
  }

  ngAfterViewInit() {
    console.log(this.viajeid)
  }

  private handleFinalizado() {
    
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
