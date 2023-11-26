import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController, LoadingController } from '@ionic/angular';


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
    private firestoreService: FirestoreService, private alertController: AlertController) {
    this.route.queryParams.subscribe(params => {
      this.viajeid = params['viajeid'];
    });



  }

  async ngOnInit() {
    this.sesion = await this.storage.get('sesion');
  
    this.firestoreService.getViajePorId(this.viajeid).subscribe((viaje: any) => {
      this.viaje = viaje;
      this.datosCargados = true;
  
      if (viaje.estado === 'Finalizado') {

        this.presentAlert("El viaje fue finalizado por el conductor")
        this.sesion.solicitado = "";
  
        // Utiliza .then() en lugar de await para establecer el valor en el almacenamiento
        this.storage.set("sesion", this.sesion).then(() => {
          this.router.navigate(['tabs/home']);
        });
      }
    });
  }

  volver() {
    this.router.navigate(["tabs/home"])
  }

  async onClick() {
    let dispo = this.viaje.disponibles

    dispo = dispo + this.sesion.asientos

    this.viaje.disponibles = dispo


    //Se le elimina el id en solicitado en el store
    this.sesion.solicitado = ""
    this.sesion.asientos = 0

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
