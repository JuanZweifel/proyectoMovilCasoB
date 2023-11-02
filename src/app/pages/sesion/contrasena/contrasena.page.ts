import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {
  email:any


  constructor(private router: Router, private authenticationService: AuthenticationService, private alertController: AlertController) {
  }
  
  ngOnInit() {
  }

  reset(){
    this.authenticationService.resetPassword(this.email).then( () =>{      
      console.log('sent'); //show confirmation dialog
      this.presentAlert('Email enviado')
    })
  }

  volver() {
    this.router.navigate(["login"])
  }

  onSubmit() {
    this.router.navigate(['login'])
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Información',
      message: message,
      buttons: ['OK'],
      backdropDismiss: false,

    });

    await alert.present();
  }
  
  

}
