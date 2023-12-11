import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-modauto',
  templateUrl: './modauto.page.html',
  styleUrls: ['./modauto.page.scss'],
})
export class ModautoPage implements OnInit {
  autoForm: FormGroup
  sesion: any
  usuario: any

  constructor(private router: Router, 
    public formBuilder: FormBuilder, 
    private storage: Storage, 
    private alertController: AlertController,
    private firestoreservice: FirestoreService,) {
    this.autoForm = this.formBuilder.group({
      patente: ['',[Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['',[Validators.required]],
    })

  }

  async ngOnInit() {
    this.sesion = await this.storage.get('sesion');
    console.log("SESION: ",this.sesion)
  }



  async mod(){


      this.sesion.auto.marca = this.autoForm.value.marca;
      this.sesion.auto.modelo = this.autoForm.value.modelo;
      this.sesion.auto.patente = this.autoForm.value.patente;

      let modauto = await this.firestoreservice.addUsuario(this.sesion);
      if (modauto) {
        await this.storage.set('sesion', this.sesion);
        this.presentAlert("Se actualizaron los datos del vehiculo")
        console.log('Se actualizaron los datos del vehiculo');
      } else {
        this.presentAlert("No se pudo modificar los datos del vehiculo el vehiculo")
        console.log('Error al modificar los datos del auto en el fire store.');
      }

      this.router.navigate(['tabs/perfil']);    
      
    console.log(this.autoForm)

  }


  volver() {
    this.router.navigate(["tabs/perfil"])
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
