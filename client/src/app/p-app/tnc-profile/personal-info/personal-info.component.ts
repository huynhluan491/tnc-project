import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  personalForm: FormGroup 

  constructor() {}

  ngOnInit(): void {
    this.loadPersonalForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.personalForm.controls; }

  loadPersonalForm() {
    this.personalForm = new FormGroup({
      UserName: new FormControl('Khánh Luân'),
      Email: new FormControl('huynhluan491@gmail.com', Validators.email),
      Total: new FormControl('2000000'),
      Address: new FormControl('TPHCM' ),
      Phone: new FormControl('032133211312'),
    })
  }


}
