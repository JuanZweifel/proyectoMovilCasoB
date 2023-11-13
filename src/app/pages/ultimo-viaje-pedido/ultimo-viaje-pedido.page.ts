import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ultimo-viaje-pedido',
  templateUrl: './ultimo-viaje-pedido.page.html',
  styleUrls: ['./ultimo-viaje-pedido.page.scss'],
})
export class UltimoViajePedidoPage implements OnInit {

  viajeSelect: any 

  constructor(private storage:Storage, private router:Router) { }

  async ngOnInit() {
    this.viajeSelect = await this.storage.get("viaje_pedido")
    console.log(this.viajeSelect)
  }

  volver() {
    this.router.navigate(['tabs/perfil'])
  }
}
