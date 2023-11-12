import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-recorrido',
  templateUrl: './recorrido.page.html',
  styleUrls: ['./recorrido.page.scss'],
})
export class RecorridoPage implements OnInit {
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
      console.log('Viaje por ID:', viaje);
      this.viaje = viaje;
      this.datosCargados = true;
    });
  }

  volver() {
    this.router.navigate(["tabs/home"])
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

}
