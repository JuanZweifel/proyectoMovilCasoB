import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  usuario: Usuario = {
    email: '',
    name: '',
    phone: '',
    password: '',
    solicitado:'',
    asientos:0,
    ofrecido:'',
    auto: {
      marca: '',
      modelo: '',
      patente: ''
  }
  }
  

  signupForm: FormGroup

  constructor(public formBuilder: FormBuilder, 
    private  loadingController: LoadingController, 
    private authenticationService: AuthenticationService,
    private firestoreservice: FirestoreService,
    private router: Router,
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
      if (error.code === 'auth/email-already-in-use') {
        this.presentAlert('Este correo ya esta registrado')
      }
      else
      {
        this.presentAlert('No se pudo registrar al usuario');
      }
        
      loading.dismiss();
    });

    if (user) {
      //crea el usuario para guardarlo en el firestorage y storage ionic
      this.usuario.email = this.signupForm.value.email
      this.usuario.name = this.signupForm.value.name
      this.usuario.phone = this.signupForm.value.phone
      this.usuario.password = this.signupForm.value.password

      this.agregarUsuario(this.usuario)


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
      message: message,
      buttons: ['OK'],
      backdropDismiss: false,

    });

    await alert.present();
  }

  async agregarUsuario(usuario:Usuario) {

    try {
      await this.firestoreservice.addUsuario(usuario);
      console.log('Usuario agregado con éxito.');
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  }
}


