import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { firstValueFrom } from 'rxjs';
import { Network, ConnectionStatus } from '@capacitor/network';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuario = {
    email: '',
    name: '',
    phone: '',
    password: '',
    solicitado: '',
    ofrecido: '',
    asientos:0,
    auto: {
      marca: '',
      modelo: '',
      patente: ''
    }
  }
  usuarioObtenido: any

  loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private authenticationService: AuthenticationService,
    private firestoreservice: FirestoreService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private storage: Storage) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    })

  }

  async getConexion(): Promise<boolean>{
    const status:ConnectionStatus = await Network.getStatus()
    return status.connected
  }

  async ngOnInit() {
    const userData = await this.storage.get('sesion');
    if (userData && userData.email && userData.password) {

      //Ingresa los datos previamente almacenado en la sesion en el formulario apra que inicie sesion
      this.loginForm.patchValue({
        email: userData.email,
        password: userData.password
      });

      let conexion = await this.getConexion()

      if (conexion){
        await this.login();
        this.router.navigate(['/tabs/perfil']);
      }
      else{
        this.presentAlert('No hay conexion a internet, redirigiendo a perfil');
        this.router.navigate(['/tabs/perfil']);
      }

      // Si hay datos de usuario en el almacenamiento, intenta iniciar sesión automáticamente.
      //this.router.navigate(['/tabs/home']);
      //Introduce el imail y contraseña en el loginform
      
       // Llama al método login para iniciar sesión automáticamente.
    }

  }


  get errorControl() {
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
        else if (error.code === 'auth/too-many-requests') {
          this.presentAlert('Se ha deshabilitado la cuenta por muchos intentos, restablezca la contraseña o pongase en contacto con un administrador');
        }
        else {
          this.presentAlert('Ocurrió un error durante la autenticación');
          console.log(error);
        }
      });

      if (user) {
        //Despues de iniciar sesion trata de extraer al usuario del firestore para poder colocarlo en el storage (sesion)
        try {
          this.usuarioObtenido = await this.firestoreservice.obtenerUsuario(this.loginForm.value.email).toPromise();

          if (this.usuarioObtenido) {
            // Usuario obtenido correctamente
            this.usuarioObtenido.password=this.loginForm.value.password

            await this.storage.set('sesion', this.usuarioObtenido);

            this.viajeold();


            loading.dismiss();
            this.router.navigate(['/tabs/home']);
          } else {
            // El usuario no fue encontrado
            loading.dismiss();
            this.router.navigate(['/login']);
            this.presentAlert('No se encontró al usuario en el Firestore');
          }
        } catch (error) {
          // Manejar cualquier error al obtener al usuario
          console.error('Error al obtener usuario:', error);
          loading.dismiss();
          this.router.navigate(['/login']);
          this.presentAlert('Ocurrió un error al obtener al usuario');
        }
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


  async viajeold() {
    try {
      const sesion = await this.storage.get('sesion')
      console.log(sesion)
      if (sesion.ofrecido) {

        const viaje: any = await firstValueFrom(this.firestoreservice.getViajePorId(sesion.ofrecido));

        // Aquí puedes utilizar el objeto del viaje obtenido por su ID
        //console.log('Viaje :', viaje);

        if (viaje) {
          await this.storage.set("viajeofrecido", viaje)
        }
      }
    }
    catch (error) {
      console.error('Error al obtener el viaje:', error);
    }

  }
  async viajepedido() {
    try {
      const sesion = await this.storage.get('sesion')
      console.log(sesion)
      if (sesion.ofrecido) {

        const viaje: any = await firstValueFrom(this.firestoreservice.getViajePorId(sesion.solicitado));

        // Aquí puedes utilizar el objeto del viaje obtenido por su ID
        //console.log('Viaje :', viaje);

        if (viaje) {
          await this.storage.set("viajeofrecido", viaje)
        }
      }
    }
    catch (error) {
      console.error('Error al obtener el viaje:', error);
    }

  }
}
