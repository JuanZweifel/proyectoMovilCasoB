import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any;
  sesion: any;
  usuario: any;
  viajePedido: any;
  viajeOfrecido : any;
  
  datosCargados: boolean = false;
  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private firestoreservice: FirestoreService,
    private storage: Storage,
    private alertController: AlertController) {
    this.user = authenticationService.getProfile();
  }

  async ionViewDidEnter(){
    this.viajeOfrecido = await this.storage.get('viajeofrecido')
    this.viajePedido = await this.storage.get('viaje_pedido')
    this.sesion = await this.storage.get('sesion');
    this.datosCargados = true;
  }

  async ngOnInit() {
    this.router.events.subscribe(() => {
        this.ionViewDidEnter();
      });
  }

  async delCar() {
    this.sesion.auto.marca = "";
    this.sesion.auto.modelo = "";
    this.sesion.auto.patente = "";

    let autoeliminado = await this.firestoreservice.addUsuario(this.sesion);
    if (autoeliminado) {
      await this.storage.set('sesion', this.sesion);
      this.presentAlert("Se elimino el vehiculo")
      console.log('Auto eliminado');
    } else {
      this.presentAlert("No se pudo eliminar el vehiculo")
      console.log('Error al eliminar el auto en el fire store.');
    }
  }

  addCar() {
    this.router.navigate(["modauto"])
  }

  pedido() {
    this.router.navigate(["ultimo-viaje-pedido"])
  }

  ofrecido() {
    this.router.navigate(["ultimo-viaje-ofrecido"])
  }


  async logout() {
    try {
      await this.authenticationService.signOut();
      await this.removeUserData();
      this.router.navigate(['login']);
    } catch (error) {
      console.error(error);
    }
  }
  
  async removeUserData() {
    try {
      let sesion = await this.storage.get('sesion');
  
      await this.storage.remove('sesion');
      await this.storage.remove('viaje_pedido');
      await this.storage.remove('viajeofrecido');
      await this.storage.remove('viajeSeleccionado');
    } catch (error) {
      console.error(error);
    }
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
