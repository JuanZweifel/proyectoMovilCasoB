import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import {AngularFireModule} from '@angular/fire/compat';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), provideFirebaseApp(() => initializeApp({"projectId":"proyectomovil-60129","appId":"1:254999014770:web:e05dab7b1e1bafbca581eb","storageBucket":"proyectomovil-60129.appspot.com","apiKey":"AIzaSyDHDnpJmG3pn4rOnG1wMUAYZxOhJa71NJ0","authDomain":"proyectomovil-60129.firebaseapp.com","messagingSenderId":"254999014770","measurementId":"G-JLPEY3SFNF"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  AngularFireModule.initializeApp(environment.firebaseConfig), ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
