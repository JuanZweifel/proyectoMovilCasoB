import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modauto',
  templateUrl: './modauto.page.html',
  styleUrls: ['./modauto.page.scss'],
})
export class ModautoPage implements OnInit {
  autoForm: FormGroup

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.autoForm = this.formBuilder.group({
      patente: ['',[Validators.required, Validators.minLength(2)]],
      marca: ['', [Validators.required]],
      modelo: ['',[Validators.required]],
    })

  }

  ngOnInit() {
  }



  mod(){

  }


  volver() {
    this.router.navigate(["tabs/perfil"])
  }

}
