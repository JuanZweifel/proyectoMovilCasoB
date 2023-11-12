import { Storage } from '@ionic/storage-angular';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  viaje: any
  sesion: any
  asientos: any

  constructor(private router: Router,
    private modalController: ModalController,
    private storage: Storage,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService) { }

  async ngOnInit() {
    this.viaje = await this.storage.get('viajeSeleccionado')
    this.sesion = await this.storage.get('sesion')
  }

  ionViewWillLeave() {
    this.cerrarModal();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  volver() {
    this.router.navigate(["tabs/home"])
  }

  async onClick() {
    this.sesion.solicitado = this.viaje.id

    let moduser = await this.firestoreService.addUsuario(this.sesion);
      if (moduser) {
        await this.storage.set('sesion', this.sesion);
        console.log('Se agrego el viaje a viaje solicitado');
      } else {
        console.log('Error al agregar viaje solicitado al usuario');
      }
      this.viaje.clientes.push(this.sesion.email);
      console.log(this.viaje.clientes)
      try {
        await this.firestoreService.actualizarViaje(this.viaje.id, { clientes: this.viaje.clientes });
        console.log('Viaje actualizado con éxito en Firestore');
      } catch (error) {
        console.error('Error al actualizar el viaje en Firestore:', error);
      }
    
      // Guarda el viaje modificado en el almacenamiento local
      this.storage.set('viaje_pedido', this.viaje);
    
  
    this.router.navigate(["recorrido"])
  }


  //Como se extraen estos datos del storage a pesar de que la vista valida de que si esta el elemento, no alcanza a abrir
  //el modal con los datos, por lo que despues de que carguen la información del storage se fuerza la visualización del 
  //modal con los datos del viaje
  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      const modal = document.querySelector('ion-modal');
      if (modal) {
        modal.componentProps = {
          viaje: this.viaje,
        };
        modal.present();
      }
    });
  }

}



