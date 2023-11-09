import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {

  sesion: any


  viaje={
    partida:'',
    destino:'',
    patente:'',
    asientos:'',
    tarifa:'',
  }

  constructor(private router:Router, private storage:Storage) { }

  async ngOnInit() {
    this.sesion = await this.storage.get('sesion')
  }

  onClick() {
    this.router.navigateByUrl('tabs/ofrecer-viaje')
  }

  async onSubmit() {
    this.viaje.patente = this.sesion.auto.patente
    await this.storage.set("viaje",this.viaje)
    this.router.navigateByUrl('conductor-viaje')
  }
}
