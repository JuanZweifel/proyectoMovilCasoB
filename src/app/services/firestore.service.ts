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




}
  