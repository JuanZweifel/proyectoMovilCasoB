import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-conductor-viaje',
  templateUrl: './conductor-viaje.page.html',
  styleUrls: ['./conductor-viaje.page.scss'],
})
export class ConductorViajePage implements OnInit {

  viaje: any

  constructor(private router:Router, 
    private storage:Storage,
    private route: ActivatedRoute,) { }

  async ngOnInit() {
    this.viaje = await this.storage.get("viaje")
  }

  async onClick() {
    await this.storage.remove('viaje')
    await this.storage.remove('viaje_pedido')
    this.router.navigateByUrl("tabs/home")
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
