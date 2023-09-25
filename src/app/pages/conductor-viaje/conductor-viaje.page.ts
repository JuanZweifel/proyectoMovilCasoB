import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conductor-viaje',
  templateUrl: './conductor-viaje.page.html',
  styleUrls: ['./conductor-viaje.page.scss'],
})
export class ConductorViajePage implements OnInit {

  constructor(private router:Router, private alertController:AlertController) { }

  ngOnInit() {
  }

  onClick() {
    this.router.navigateByUrl("tabs/home")
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Estas seguro?',
      buttons: ['Si','No'],
      backdropDismiss:false,
      
    });

    await alert.present();

    await alert.onDidDismiss()
    {
      console.log("Cerrando la alerta") 
    }

  }

  public alertButtons = [
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        this.router.navigateByUrl('tabs/ofrecer-viaje')
      },
    },
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
  ];
}
