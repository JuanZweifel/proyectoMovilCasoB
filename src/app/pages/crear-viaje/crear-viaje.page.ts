import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Viaje } from 'src/app/interfaces/viaje';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {

  sesion: any


  viaje: Viaje = {
    chofer: '',
    partida: '',
    destino: '',
    patente: '',
    asientos: 0,
    disponibles: 0,
    tarifa: 0,
    clientes: [],
    estado:'Disponible'
  }

  constructor(private router:Router, 
    private storage:Storage,
    private firestoreservice: FirestoreService) { }

  async ngOnInit() {
    this.sesion = await this.storage.get('sesion')
  }

  onClick() {
    this.router.navigateByUrl('tabs/ofrecer-viaje')
  }

  // async onSubmit() {
  //   this.viaje.patente = this.sesion.auto.patente
  //   await this.storage.set("viaje",this.viaje)
  //   this.router.navigateByUrl('conductor-viaje')
  // }



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


  
}
