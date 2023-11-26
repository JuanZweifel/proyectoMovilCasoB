import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajePedidoGuard implements CanActivate {
  constructor(private storage:Storage, private router:Router, private alertController:AlertController){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.permitirAcesso();
  }
  
  async permitirAcesso()
  {
    const valor = this.getViaje().then((data) => {
      if (data.solicitado == ""){
        return true
      }else{
        this.presentAlert("Para tomar un viaje o ofrecerlo, primero tiene que cancelar el actual")
        return this.router.navigate(['recorrido'], {
          queryParams: {
            viajeid: data.solicitado
          }
        })
      }
    })
    return valor
  }

  async getViaje() {
    return await this.storage.get("sesion");
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
