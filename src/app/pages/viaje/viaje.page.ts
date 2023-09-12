import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  volver(){
    this.router.navigate(["tabs/home"])
  }
  
  onClick(){
    this.router.navigate(["recorrido"])
  }
  
}

