import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modauto',
  templateUrl: './modauto.page.html',
  styleUrls: ['./modauto.page.scss'],
})
export class ModautoPage implements OnInit {
  autoForm: FormGroup
  sesion: any
  usuario: any

  constructor(private router: Router, public formBuilder: FormBuilder, private storage: Storage, private alertController: AlertController) {
    this.autoForm = this.formBuilder.group({
      patente: ['',[Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['',[Validators.required]],
    })

  }

  async ngOnInit() {
    this.sesion = await this.storage.get('sesion');
    this.usuario = await this.storage.get(this.sesion.email);
  }



  async mod(){


      this.usuario.auto.marca = this.autoForm.value.marca;
      this.usuario.auto.modelo = this.autoForm.value.modelo;
      this.usuario.auto.patente = this.autoForm.value.patente;

      await this.storage.set(this.sesion.email, this.usuario);
      await this.storage.set('sesion', this.usuario);
      this.router.navigate(['tabs/perfil']);    
      
    console.log(this.autoForm)

  }


  volver() {
    this.router.navigate(["tabs/perfil"])
  }

  

}
