import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user:any
  constructor(private router: Router ,private authenticationService: AuthenticationService, private storage: Storage) {
    this.user = authenticationService.getProfile();
  }

  ngOnInit() {
    
  }



  async logout(){
    this.authenticationService.signOut().then(()=>{
      this.removeUserData()
      this.router.navigate(['login']).catch((error)=>{
        console.log(error);
      })
    })
  }

  async removeUserData() {
    await this.storage.remove('user');
  }


}
