import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {

  viaje={
    partida:'',
    destino:'',
    patente:'',
    asientos:'',
    tarifa:'',
  }

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onClick() {
    this.router.navigateByUrl('tabs/ofrecer-viaje')
  }

  onSubmit() {
    this.router.navigateByUrl('conductor-viaje')
  }
}
