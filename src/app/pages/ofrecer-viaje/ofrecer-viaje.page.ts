import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ofrecer-viaje',
  templateUrl: './ofrecer-viaje.page.html',
  styleUrls: ['./ofrecer-viaje.page.scss'],
})
export class OfrecerViajePage implements OnInit {

  viaje: any

  constructor(private router:Router, private storage:Storage) { }

  async ngOnInit() {
    this.viaje = await this.storage.get('viaje')
  }

  onClick(ruta:string) 
  {
    this.router.navigate(['/'+ruta])
  }
}
