import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup

  constructor(public formBuilder: FormBuilder, 
    private  loadingController: LoadingController, 
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private storage: Storage) {

    this.signupForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9].*).{8,}$')]]
    })
    
  }

  ngOnInit() {

  }


  get errorControl(){
    return this.signupForm?.controls;
  }


async signUP() {
  const loading = await this.loadingController.create().catch((error) => {
    console.error('Error al crear el LoadingController', error);
  });

  if (!loading) {
    // Handle the error gracefully, perhaps by showing a toast message or taking other actions.
    this.presentAlert('Error al cargar, por favor inténtalo de nuevo.');
    return;
  }

  await loading.present();

  if (this.signupForm.valid) {
    const user = await this.authenticationService.registerUser(this.signupForm.value.email, this.signupForm.value.password).catch((error) => {
      console.error(error);
      this.presentAlert('No se pudo registrar al usuario');
      loading.dismiss();
    });

    if (user) {

      let usuario = {
        name: this.signupForm.value.name,
        phone: this.signupForm.value.phone,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        auto: {
          marca: '',
          modelo: '',
          patente: ''
        }
      };


      await this.storage.set(this.signupForm.value.email, usuario);

      loading.dismiss();
      this.router.navigate(['']);
    } else {
      console.log('Por favor, proporciona todos los valores requeridos en el formulario.');
    }
  } else {
    // Form is not valid; you can handle this case if necessary
    this.presentAlert('Por favor, completa el formulario correctamente.');
    loading.dismiss();
  }
}


  volver() {
    this.router.navigate(["login"])
  }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Información',
      message: "Usuario y/o password incorrectos",
      buttons: ['OK'],
      backdropDismiss: false,

    });

    await alert.present();
  }



}
