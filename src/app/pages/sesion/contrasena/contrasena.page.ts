import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  volver() {
    this.router.navigate(["login"])
  }

  onSubmit() {
    this.router.navigate(['login'])
  }
  
  usuario = {
    username: '',
    mail: '',
    phone: '',
    password: ''
  }

}
