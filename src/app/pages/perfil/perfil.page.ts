import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user:any;
  sesion: any;
  usuario: any;
  datosCargados: boolean = false;
  constructor(private router: Router ,private authenticationService: AuthenticationService, private storage: Storage, private alertController: AlertController) {
    this.user = authenticationService.getProfile();
  }
  
  
  async ngOnInit() {
    
    this.sesion = await this.storage.get('sesion');
    this.usuario = await this.storage.get(this.sesion.email);
    this.datosCargados = true; 
  }


  async delCar(){
    this.usuario.auto.marca = "";
    this.usuario.auto.modelo = "";
    this.usuario.auto.patente = "";

    await this.storage.set(this.sesion.email, this.usuario);
    await this.storage.set('sesion', this.usuario);


    console.log("Eliminar")
  }

  addCar(){
    this.router.navigate(["modauto"])

  }



  async logout(){
    this.authenticationService.signOut().then(()=>{
      this.removeUserData()
      this.router.navigate(['login']).catch((error)=>{
        console.log(error);
      })
    })
  }

  async removeUserData() {
    let sesion = await this.storage.get('sesion');
    await this.storage.remove('sesion');
  }


  async mostrarConfirmacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este elemento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // Acción al hacer clic en "Cancelar" (opcional)
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            // Llama al método de eliminación aquí
            this.delCar();
          }
        }
      ]
    });
  
    await alert.present();
  }


}
