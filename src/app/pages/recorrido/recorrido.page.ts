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
  nuevaListaCorreos: string[] = []


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

    if (this.viaje.destino) {
      console.log("Se queda")
    }
    else {
      this.router.navigate(["tabs/home"])
    }
  }

  volver() {
    this.router.navigate(["tabs/home"])
  }

  async onClick() {
    //Se le elimina el id en solicitado en el store
    this.sesion.solicitado = ""

    let modusuario = await this.firestoreService.addUsuario(this.sesion);
    if (modusuario) {
      await this.storage.set('sesion', this.sesion);

      console.log('REC');
    } else {

      console.log('Error REC');
    }

    // Se elimina el correo en la lista de pasajeros del viaje

    let correoAEliminar: string = this.sesion.email;
    
    // Suponiendo que 'correosviaje' es un array de correos (tipo string)
    let correosviaje: string[] = this.viaje.clientes;
    
    // Filtrar la lista para excluir el correo que deseas eliminar
    this.nuevaListaCorreos = correosviaje.filter((cliente: string) => cliente !== correoAEliminar);
    
    // Asignar la nueva lista a 'correosviaje'
    this.viaje.clientes = this.nuevaListaCorreos;
    
    //Actualiza los datos en el firestore
    await this.firestoreService.actualizarViaje(this.viajeid, this.viaje);
      

    this.storage.remove('viaje_pedido')
    this.router.navigate(["tabs/home"])
  }

  ngAfterViewInit() {
    console.log(this.viajeid)
  }

}
