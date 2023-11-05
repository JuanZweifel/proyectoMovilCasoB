import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Network, ConnectionStatus } from '@capacitor/network';
import { Observable } from 'rxjs';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConexionGuard implements CanActivate {
  constructor(private router: Router,private alertController:AlertController){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    //Cambie el tipo de CanActivate para que me dejara usar "getConexion" y rederigir dependiendo del estado de la conexion
    state: RouterStateSnapshot): Promise<boolean|UrlTree>{
      const isConnected = await this.getConexion();
      if (isConnected) {
        return true;
      } else {
        this.presentAlert("Tiene que tener conexion a internet para entrar a este apartado")
        //De momento esta asi ya que la ruta de defecto tras logearse es tabs/home
        return this.router.navigate(['tabs/perfil']);
      }
    }
  
  async getConexion(): Promise<boolean>{
    const status:ConnectionStatus = await Network.getStatus()
    return status.connected
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

  //if (Network) {
    //Network.getStatus().then((status)=>{
      //return status.connected
    //})
  //}
  //return true

  //Con esto funciona pero no deja redirigir en canActivate
//getConexion(){
  //return Network.getStatus().then((status)=>{
    //if (status.connected){
      //console.log("Con internet")
      //return true
    //}else{
      //return false
    //}
  //});
//}