import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  path = '/usuario'



  constructor(private authstore:AngularFirestore) { }

  async addUsuario(usuario:Usuario){
    usuario.password=''
    await this.authstore.collection(this.path).doc(usuario.email).set(usuario)
  }


  async obtenerUsuario(usuario:Usuario): Promise<Usuario>{
    return new Promise((resolve, reject) =>{
      this.authstore.collection(this.path).doc(usuario.email).get().subscribe((doc: any) => {
        if (doc !== undefined){
          let datos = doc.data()
          usuario.name = datos['nombre']
          resolve(usuario)
        }
        else{
          reject("No se encontro al usuario")
        }
      })
    })
  }

}
  