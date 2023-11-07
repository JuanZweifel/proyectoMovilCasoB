import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recorrido',
  templateUrl: './recorrido.page.html',
  styleUrls: ['./recorrido.page.scss'],
})
export class RecorridoPage implements OnInit {

  viaje_pedido: any

  constructor(private router: Router, private storage:Storage) { }

  async ngOnInit() {
    this.viaje_pedido = await this.storage.get('viaje_pedido')
  }

  volver(){
    this.router.navigate(["tabs/home"])
  }

  onClick() {
    this.storage.remove('viaje_pedido')
    this.router.navigate(["tabs/home"])
  }

}
