import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ofrecer-viaje',
  templateUrl: './ofrecer-viaje.page.html',
  styleUrls: ['./ofrecer-viaje.page.scss'],
})
export class OfrecerViajePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onClick(ruta:string) 
  {
    this.router.navigate(['/'+ruta])
  }
}
