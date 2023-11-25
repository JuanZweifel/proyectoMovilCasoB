import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Route, Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { AlertController, LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todosLosViajes: any[] = [];
  viajes: any
  sesion: any
  viaje_pedido: any
  viajeid: any
  viajev: any


  viaje: Viaje = {
    chofer: '',
    partida: '',
    destino: '',
    patente: '',
    asientos: 0,
    disponibles: 0,
    tarifa: 0,
    clientes: [],
    estado: 'Disponible'
  }
  loadingController: any;

  constructor(private router: Router,
    private storage: Storage,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    loadingController: LoadingController) {

  }

  async ngOnInit() {
    this.firestoreService.getTodosLosViajes().subscribe((viajes: any[]) => {
      this.todosLosViajes = viajes;
      //console.log('Todos los viajes con ID:', viajes);
    });

    this.sesion = await this.storage.get('sesion')
    this.viaje_pedido = await this.storage.get('viaje_pedido')
    this.router.events.subscribe(() => {
      this.ionViewDidEnter();
    });


  }

  async ionViewDidEnter(){
    this.sesion = await this.storage.get('sesion')
    this.viaje_pedido = await this.storage.get('viaje_pedido')
  }


  //Almacena la informacion del viaje seleccionado antes de ir a viaje
  // async irViaje(viaje: any) {
  //   this.storage.set('viajeSeleccionado', viaje).then(() => {
  //     this.router.navigate(['viaje']);
  //   });
  // }

  async irViaje(viaje: any) {
    try {
      console.log('Iniciando verificación de recorrido...');

      // Obtén el viaje por ID
      const viajeb: any = await firstValueFrom(this.firestoreService.getViajePorId(viaje.id));

      // Aquí puedes utilizar el objeto del viaje obtenido por su ID
      console.log('Viaje por B:', viaje);

      if (viajeb) {
        console.log("Viajeb")
        console.log(viajeb)
        // El recorrido está disponible, navega a la página de recorrido
        console.log('Recorrido disponible. Navegando a recorrido...');
        this.router.navigate(['viaje'], {
          queryParams: {
            viajeid: viajeb.id,
          }
        });
      } else {
        // Si el viaje no está disponible, realiza otras operaciones
        console.log("LLEGUA AQUI");
      
        this.presentAlert("No se pudo inrgesar al viaje");
        console.log("No se pudo ingresar al viaje");
      }
    } catch (error) {
      console.error('Error al obtener el viaje:', error);
    }



  }

  async irRecorrido(sesion: any) {
    try {
      console.log('Iniciando verificación de recorrido...');

      // Obtén el viaje por ID
      const viaje: any = await firstValueFrom(this.firestoreService.getViajePorId(this.sesion.solicitado));

      // Aquí puedes utilizar el objeto del viaje obtenido por su ID
      console.log('Viaje por B:', viaje);

      if (viaje) {
        // El recorrido está disponible, navega a la página de recorrido
        console.log('Recorrido disponible. Navegando a recorrido...');
        this.router.navigate(['recorrido'], {
          queryParams: {
            viajeid: this.sesion.solicitado,
          }
        });
      } else {
        // Si el viaje no está disponible, realiza otras operaciones
        console.log("LLEGUA AQUI");

        // Elimina el solicitado del usuario del storage y firestore
        this.sesion.solicitado = "";
        const moduser = await this.firestoreService.addUsuario(this.sesion);

        if (moduser) {
          await this.storage.set('sesion', this.sesion);
          console.log('Se eliminó el viaje del usuario');
        } else {
          console.log('Error al eliminar el viaje del usuario');
        }

        this.presentAlert("El viaje ya no está disponible");
        console.log("El viaje no está disponible");
      }
    } catch (error) {
      console.error('Error al obtener el viaje:', error);
    }


    //this.router.navigate(['/recorrido'], navigationExtras);
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
