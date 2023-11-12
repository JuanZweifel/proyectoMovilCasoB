import { Storage } from '@ionic/storage-angular';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Viaje } from 'src/app/interfaces/viaje';
import { FirestoreService } from 'src/app/services/firestore.service';

declare var google: any;

@Component({
  selector: 'app-ofrecer-viaje',
  templateUrl: './ofrecer-viaje.page.html',
  styleUrls: ['./ofrecer-viaje.page.scss'],
})
export class OfrecerViajePage implements OnInit {

  viaje: Viaje = {
    chofer: '',
    partida: '',
    destino: '',
    patente: '',
    asientos: 0,
    tarifa: 0,
    clientes: [],
    estado:'Disponible'
  }
  sesion: any

  constructor(private router:Router, private storage:Storage, private zone:NgZone, private firestoreservice: FirestoreService) { }

  //Places Api
  
  marker!: Marker;
  placeSelect!: string;
  searchQuery!: string;
  places: any[] = [];
  partidaPlaces: any[] = [];
  destinoPlaces: any[] = [];
  placesSub?: Subscription;
  private _places = new BehaviorSubject<any[]>([])

  get search_places() {
    return this._places.asObservable();
  }

  async ngOnInit() {
    this.placesSub = this.search_places.subscribe({
      next: (places) => {
        this.places = places;
      },
      error: (e) => {
        console.log(e);
      }
    });
    this.sesion = await this.storage.get('sesion')
  }

  async onSearchChange(event: any, inputType: 'partida' | 'destino') {
    console.log(event)
    this.searchQuery = event.detail.value
    if (this.searchQuery.length>0) await this.getPlaces();
    if (this.searchQuery.length == 0) this.places = [];
    if (inputType === 'partida'){
      this.partidaPlaces = this.places
    }else{
      this.destinoPlaces = this.places
    }
  }

  async getPlaces() {
    try {
      let service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({
        input: this.searchQuery,
        componentRestrictions: {
          country: 'CL'
        }
      }, (predictions:any) => {
        let autoCompleteItems:any = [];
        this.zone.run(() => {
          if(predictions != null) {
            predictions.forEach(async(prediction:any) => {
              console.log('prediction: ', prediction);
              let latLng: any = await this.geoCode(prediction.description);
              const places = {
                title: prediction.structured_formatting.main_text,
                address: prediction.description,
                lat: latLng.lat,
                lng: latLng.lng
              };
              console.log('places: ', places);
              autoCompleteItems.push(places);
            });
            // this.places = autoCompleteItems;
            // console.log('final places', this.places);
            // rxjs behaviorSubject
            this._places.next(autoCompleteItems);
          }
        });
      });
    } catch(e) {
      console.log(e);
    }
  }

  // Geocoding Api
  geoCode(address:any) {
    let latlng = {lat: '', lng: ''};
    return new Promise((resolve, reject) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address' : address}, (results:any) => {
        console.log('results: ', results);
        latlng.lat = results[0].geometry.location.lat();
        latlng.lng = results[0].geometry.location.lng();
        resolve(latlng);
      });
    });
  }

  // Formulario viajes
  async onSubmit() {
    this.viaje.patente = this.sesion.auto.patente
    this.viaje.chofer = this.sesion.email
    let viaje = await this.firestoreservice.addViaje(this.viaje);
      if (viaje) {
        await this.storage.set("viajeofrecido",this.viaje)
        console.log('Se creo el viaje');
      } else {
        console.log('Error al crear el viaje');
      }
    this.router.navigateByUrl('conductor-viaje')
  }

  
  async selectedPartida(place: any){
    console.log(place.address)
    this.viaje.partida = place.address

    this.partidaPlaces = []
    this.places = []
  }

  async selectedDestino(place: any){
    console.log(place.address)
    this.viaje.destino = place.address

    this.destinoPlaces= []
    this.places = []
  }

  onClick(ruta:string) 
  {
    this.router.navigate(['/'+ruta])
  }

  ngOnDestroy(): void {
      if(this.placesSub) this.placesSub.unsubscribe();
  }
}
