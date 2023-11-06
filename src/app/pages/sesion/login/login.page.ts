import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder, 
    private  loadingController: LoadingController, 
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private storage: Storage) {

    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    })
    
  }

  async ngOnInit() {
    const userData = await this.getUserData();
    if (userData && userData.email && userData.password) {
      // Si hay datos de usuario en el almacenamiento, intenta iniciar sesión automáticamente.
      this.loginForm.patchValue({
        email: userData.email,
        password: userData.password
      });
      this.login(); // Llama al método login para iniciar sesión automáticamente.
    }
  }


  get errorControl(){
    return this.loginForm?.controls;
  }



  async login() {
    const loading = await this.loadingController.create().catch((error) => {
      console.error('Error al crear el LoadingController', error);
    });
  
    if (!loading) {
      // Handle the error gracefully, perhaps by showing a toast message or taking other actions.
      this.presentAlert('Error al cargar, por favor inténtalo de nuevo.');
      return;
    }
  
    await loading.present();
  
    if (this.loginForm.valid) {
      const user = await this.authenticationService.loginUser(this.loginForm.value.email, this.loginForm.value.password).catch((error) => {
        loading.dismiss()
        if (error.code === 'auth/invalid-login-credentials') {
          this.presentAlert('Usuario y/o contraseña incorrecto')
        } 
        else if(error.code === 'auth/too-many-requests'){
          this.presentAlert('Se ha deshabilitado la cuenta por muchos intentos, restablezca la contraseña o pongase en contacto con un administrador');
        }
        else {
          this.presentAlert('Ocurrió un error durante la autenticación');
          console.log(error);
        }
      });
  
      if (user) {


        let usuario={
          email: this.loginForm.value.email,
          password:this.loginForm.value.password
        }

        await this.storage.set('user', usuario);

        
        loading.dismiss();
        this.router.navigate(['/tabs/home']);
        
        
        
      } else {
        console.log('Por favor, proporciona todos los valores requeridos en el formulario.');
      }
    } else {
      // Form is not valid; you can handle this case if necessary
      this.presentAlert('Por favor, completa el formulario correctamente.');
      loading.dismiss();
    }
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


//this.presentAlert()

  
  crearCuenta() {
    this.router.navigate(["signup"])
  }

  restaurarContrasena() {
    this.router.navigate(["contrasena"])
  }

  async getUserData() {
    return await this.storage.get('user');
  }

}
