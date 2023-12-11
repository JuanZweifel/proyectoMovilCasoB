import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ultimo-viaje-ofrecido',
  templateUrl: './ultimo-viaje-ofrecido.page.html',
  styleUrls: ['./ultimo-viaje-ofrecido.page.scss'],
})
export class UltimoViajeOfrecidoPage implements OnInit {

  viajeSelect: any 

  constructor(private storage:Storage, private router:Router) { }

  async ngOnInit() {
    this.viajeSelect = await this.storage.get("viajeofrecido")
    console.log(this.viajeSelect)
  }

  volver() {
    this.router.navigate(['tabs/perfil'])
  }
}
