import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../p-layout/shared/services/storage.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  personalForm: FormGroup 
  userName: string = '';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadPersonalForm();
    const userInfo = this.storageService.getUser();
    this.personalForm.patchValue(userInfo);
    this.userName = userInfo.UserName;
  }

  // convenience getter for easy access to form fields
  get f() { return this.personalForm.controls; }

  loadPersonalForm() {
    this.personalForm = new FormGroup({
      UserName: new FormControl(''),
      Email: new FormControl('', Validators.email),
      Total: new FormControl(''),
      Address: new FormControl('' ),
      Phone: new FormControl(''),
    })
  }


}
