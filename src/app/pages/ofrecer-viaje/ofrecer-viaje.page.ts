import { Storage } from '@ionic/storage-angular';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-ofrecer-viaje',
  templateUrl: './ofrecer-viaje.page.html',
  styleUrls: ['./ofrecer-viaje.page.scss'],
})
export class OfrecerViajePage implements OnInit {

  viaje: any

  constructor(private router:Router, private storage:Storage, private zone:NgZone) { }

  ionViewDidEnter(){
    this.createMap();
  }

    //Places Api
  marker!: Marker;
  placeSelect!: string;
  searchQuery!: string;
  places: any[] = [];
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
    this.viaje = await this.storage.get('viaje')
  }

  async onSearchChange(event: any) {
    console.log(event)
    this.searchQuery = event.detail.value
    if (this.searchQuery.length>0) await this.getPlaces();
    if (this.searchQuery.length == 0) this.places = [];
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
        lat: -36.795327746685054,
        lng: -73.06255176011926,
      },
      zoom: 17, // The initial zoom level to be rendered by the map
      },
    })
    this.createMarker();
  }

  async createMarker() {
    const marker = {
      coordinate: {
        lat: -36.795327746685054,
        lng: -73.06255176011916,
      },
      title: 'Partida',
    }
    await this.map.addMarker(marker);
  }

    // Rescata el lugar seleccionado en la lista
  async selectedPlace(place: any){
    console.log(place)
    console.log(place.lat)
    console.log(place.lng)
  }

  onClick(ruta:string) 
  {
    this.router.navigate(['/'+ruta])
  }

  ngOnDestroy(): void {
      if(this.placesSub) this.placesSub.unsubscribe();
  }
}
