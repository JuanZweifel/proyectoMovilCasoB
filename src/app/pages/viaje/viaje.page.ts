import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {


  constructor(private router: Router, private modalController: ModalController) { }

  ngOnInit() {

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
    this.router.navigate(["recorrido"])
  }
  
}
  


