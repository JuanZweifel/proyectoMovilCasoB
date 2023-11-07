import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  viaje: any
  sesion: any
  viaje_pedido: any

  constructor(private router: Router, private storage:Storage) {
  }

  async ngOnInit() {
    this.viaje = await this.storage.get('viaje')
    this.sesion = await this.storage.get('sesion')
    this.viaje_pedido = await this.storage.get('viaje_pedido')
  }

  irViaje(){
    this.router.navigate(["viaje"])
  }

  irRecorrido(){
    this.router.navigate(["recorrido"])
  }

}
