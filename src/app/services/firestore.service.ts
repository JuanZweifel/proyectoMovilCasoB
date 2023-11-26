import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Usuario } from '../interfaces/usuario';
import { Viaje } from '../interfaces/viaje';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

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


  viaje: Viaje = {
    chofer: '',
    partida: '',
    destino: '',
    patente: '',
    asientos: 0,
    disponibles: 0,
    tarifa: 0,
    clientes: [],
    estado: ''
  }

  path = '/usuario'



  constructor(private authstore:AngularFirestore) { }

  


  async addUsuario(usuario: Usuario): Promise<boolean> {
    try {
      //usuario.password = '';
      await this.authstore.collection(this.path).doc(usuario.email).set(usuario);
      return true; // Indica que la operación fue exitosa
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      return false; // Indica que la operación falló
    }
  }

  async actualizarUsuario(email: string, nuevosDatos: any): Promise<void> {
    try {
      await this.authstore.collection('/usuarios').doc(email).update(nuevosDatos);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  }

  async actualizarViaje(viajeId: string, datos: any): Promise<void> {
    try {
      await this.authstore.collection('/viajes').doc(viajeId).update(datos);
    } catch (error) {
      console.error('Error al actualizar el viaje:', error);
    }
  }



  // obtenerUsuario(email: string): Observable<Usuario> {
  //   return this.authstore.collection(this.path).doc(email).get().pipe(
  //     map((doc: any) => {
  //       if (doc.exists) {
  //         const datos = doc.data();
  //         this.usuario.email = datos.email;
  //         this.usuario.phone = datos.phone;
  //         this.usuario.name = datos.name;
  //         this.usuario.solicitado = datos.solicitado;
  //         this.usuario.ofrecido = datos.ofrecido;
  //         this.usuario.password = datos.password;
  //         this.usuario.auto.marca = datos.auto.marca;
  //         this.usuario.auto.modelo = datos.auto.modelo;
  //         this.usuario.auto.patente = datos.auto.patente;
  //         return this.usuario;
  //       } else {
  //         throw new Error("No se encontró al usuario");
  //       }
  //     })
  //   );
  // }

  obtenerUsuario(email: string): Observable<Usuario> {
    return this.authstore.collection(this.path).doc(email).get().pipe(
      map((doc: any) => {
        if (doc.exists) {
          const datos = doc.data();
          const usuario: Usuario = {
            email: datos.email,
            phone: datos.phone,
            name: datos.name,
            solicitado: datos.solicitado,
            ofrecido: datos.ofrecido,
            asientos: datos.asientos,
            password: datos.password,
            auto: {
              marca: datos.auto.marca,
              modelo: datos.auto.modelo,
              patente: datos.auto.patente
            }
          };
          return usuario;
        } else {
          throw new Error("No se encontró al usuario");
        }
      })
    );
  }


  async addViaje(viaje: Viaje): Promise<boolean> {
    try {
      await this.authstore.collection('/viajes').doc().set(viaje);
      return true; // Indica que la operación fue exitosa
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      return false; // Indica que la operación falló
    }
  }

  async addViajer(viaje: Viaje): Promise<any> {
    try {
      const docRef = await this.authstore.collection('/viajes').add(viaje);
      const viajeId = docRef.id;
  
      // Si el ID se obtiene correctamente, devolver el viaje con su ID
      if (viajeId) {
        return { id: viajeId, ...viaje };
      } else {
        console.error('Error al obtener el ID del nuevo viaje');
        return false;
      }
    } catch (error) {
      console.error('Error al agregar el viaje:', error);
      return false; // Indica que la operación falló
    }
  }
  

  


  // getTodosLosViajes(): Observable<any[]> {
  //   return this.authstore.collection('/viajes').valueChanges();
  // }


  // getTodosLosViajes(): Observable<any[]> {
  //   return this.authstore.collection('/viajes').snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as any;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  // }
  getTodosLosViajes(): Observable<any[]> {
    return this.authstore.collection('/viajes', ref => ref.where('estado', '==', 'Disponible').where('disponibles', '!=', 0))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  // getViajePorId(viajeId: string): Observable<any> {
  //   return this.authstore.collection('/viajes').doc(viajeId).snapshotChanges().pipe(
  //     map(action => {
  //       const data = action.payload.data() as any;
  //       const id = action.payload.id;
  //       return { id, ...data };
  //     })
  //   );
  // }

  getViajePorId(viajeId: string): Observable<any> {
    return this.authstore.collection('/viajes').doc(viajeId).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as any;
        const id = action.payload.id;
  
        // Verificar si el estado "solicitado" es igual a "disponible"
        if (data) {
          return { id, ...data };
        } else {
          return null; // El viaje no está disponible o no existe
        }
      })
    );
  }

}
  