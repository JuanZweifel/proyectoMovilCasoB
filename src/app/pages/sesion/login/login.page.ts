import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  usuario = {
    username: '',
    password: ''
  }


  constructor(private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
  }


  onSubmit() {
    if (this.usuario.username == "admin@" && this.usuario.password == "123") {
      this.router.navigate(['tabs/home'])
    }
    else {

      this.presentAlert()
    }

  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Información',
      message: "Usuario y/o password incorrectos",
      buttons: ['OK'],
      backdropDismiss: false,

    });

    await alert.present();


  }

  onClick() {
    this.router.navigate(["signup"])
  }

}
