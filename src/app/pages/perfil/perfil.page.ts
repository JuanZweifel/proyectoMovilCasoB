import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user:any
  constructor(private router: Router ,private authenticationService: AuthenticationService) {
    this.user = authenticationService.getProfile();
  }

  ngOnInit() {

  }



  async logout(){
    this.authenticationService.signOut().then(()=>{
      this.router.navigate(['login']).catch((error)=>{
        console.log(error);
      })
    })
  }


}
