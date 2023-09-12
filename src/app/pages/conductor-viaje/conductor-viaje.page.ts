import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conductor-viaje',
  templateUrl: './conductor-viaje.page.html',
  styleUrls: ['./conductor-viaje.page.scss'],
})
export class ConductorViajePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onClick() {
    this.router.navigateByUrl("tabs/home")
  }

}
