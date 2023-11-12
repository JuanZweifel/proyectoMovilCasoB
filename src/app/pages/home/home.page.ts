import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Route, Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todosLosViajes: any[] = [];
  viajes:any
  sesion: any
  viaje_pedido: any
  viajeid:any
  

  viaje: Viaje = {
    chofer: '',
    partida: '',
    destino: '',
    patente: '',
    asientos: 0,
    tarifa: 0,
    clientes: [],
    estado:'Disponible'
  }
  loadingController: any;

  constructor(private router: Router, 
    private storage:Storage,
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

    
  }

  
  //Almacena la informacion del viaje seleccionado antes de ir a viaje
  async irViaje(viaje: any) {
    this.storage.set('viajeSeleccionado', viaje).then(() => {
      this.router.navigate(['viaje']);
    });
  }

  async irRecorrido(sesion: any){

    //Primero verifica si el recorrido sigue disponible
      await this.firestoreService.getViajePorId(this.sesion.solicitado).subscribe((viaje: any) => {
      // Aquí puedes utilizar el objeto del viaje obtenido por su ID
      console.log('Viaje por B:', viaje);
      this.viaje = viaje;
      
    });
    
    if (this.viaje){

      this.router.navigate(['recorrido'], {
        queryParams: {
          viajeid: sesion.solicitado,
        }
      });
      
    }
    else{
    //Si el viaje no esta disponible modifica elimina el solicitado del usuario del storage y firestore
    this.sesion.solicitado = ""

    let moduser = await this.firestoreService.addUsuario(this.sesion);
      if (moduser) {
        await this.storage.set('sesion', this.sesion);
        console.log('Se elimino el viaje del usuario');
      } else {
        console.log('Error al eliminar el viaje del usuario');
      }
      
      this.presentAlert("El viaje ya no esta disponible")
        console.log("El viaje no esta disponible")
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
