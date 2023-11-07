import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  viaje: any
  asientos: any

  constructor(private router: Router, private modalController: ModalController, private storage:Storage) { }

  async ngOnInit() {
    this.viaje = await this.storage.get('viaje')
  }
  
  ionViewWillLeave() {
    this.cerrarModal();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  volver(){
    this.router.navigate(["tabs/home"])
  }
  
  onClick(){
    this.viaje.asientos = this.asientos
    this.storage.set("viaje_pedido",this.viaje)
    this.router.navigate(["recorrido"])
    
  }
  
}
  


