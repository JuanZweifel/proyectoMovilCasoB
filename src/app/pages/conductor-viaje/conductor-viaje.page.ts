import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-conductor-viaje',
  templateUrl: './conductor-viaje.page.html',
  styleUrls: ['./conductor-viaje.page.scss'],
})
export class ConductorViajePage implements OnInit {

  viajeid: any
  sesion: any
  viaje: any
  datosCargados: boolean = false;


  constructor(private router: Router, private storage: Storage, private route: ActivatedRoute,
    private firestoreService: FirestoreService) {
    this.route.queryParams.subscribe(params => {
      this.viajeid = params['viajeid'];
    });



  }

  async ngOnInit() {
    this.sesion = await this.storage.get('sesion')
    this.firestoreService.getViajePorId(this.viajeid).subscribe((viaje: any) => {
      // Aquí puedes utilizar el objeto del viaje obtenido por su ID
      //console.log('Viaje por ID:', viaje);
      this.viaje = viaje;
      this.datosCargados = true;
    });
  }


  async onClick() {
    this.sesion.solicitado = ""

    let modusuario = await this.firestoreService.addUsuario(this.sesion);
    if (modusuario) {
      await this.storage.set('sesion', this.sesion);

      console.log('REC');
    } else {

      console.log('Error REC');
    }


    this.storage.remove('viaje_pedido')
    this.router.navigate(["tabs/home"])
  }

  ngAfterViewInit() {
    console.log(this.viajeid)
  }


  volver(){
    this.router.navigateByUrl("tabs/ofrecer-viaje")
  }


  
//Como se extraen estos datos del storage a pesar de que la vista valida de que si esta el elemento, no alcanza a abrir
  //el modal con los datos, por lo que despues de que carguen la información del storage se fuerza la visualización del 
  //modal con los datos del viaje
  // ngAfterViewInit() {
  //   this.route.queryParams.subscribe((params) => {
  //     const modal = document.querySelector('ion-modal');
  //     if (modal) {
  //       modal.componentProps = {
  //         viaje: this.viaje,
  //       };
  //       modal.present();
  //     }
  //   });
  // }



}
