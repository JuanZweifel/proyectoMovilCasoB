import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conductor-viaje',
  templateUrl: './conductor-viaje.page.html',
  styleUrls: ['./conductor-viaje.page.scss'],
})
export class ConductorViajePage implements OnInit {

  viaje: any

  constructor(private router:Router, private storage:Storage) { }

  async ngOnInit() {
    this.viaje = await this.storage.get("viaje")
  }

  async onClick() {
    await this.storage.remove('viaje')
    await this.storage.remove('viaje_pedido')
    this.router.navigateByUrl("tabs/home")
  }

  volver(){
    this.router.navigateByUrl("tabs/ofrecer-viaje")
  }

}
