import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  usuario = {
    username: '',
    mail: '',
    phone: '',
    password: ''
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  volver() {
    this.router.navigate(["login"])
  }

  onSubmit() {
    this.router.navigate(['tabs/home'])
  }

  onClick() {}
}
