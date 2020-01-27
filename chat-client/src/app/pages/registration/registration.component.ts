import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatClientServiceImpl} from "../../chat-client-service-impl.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private chatServiceClient: ChatClientServiceImpl, private router: Router) { }

  ngOnInit() {
    if (this.chatServiceClient.isUserRegistered()) {
      this.router.navigate(['/chat'])
    }
    this.registrationForm = new FormGroup({
      alias: new FormControl('', [Validators.required, Validators.minLength(2)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  registerUser() {
    this.chatServiceClient.createUser(this.alias, this.name, () => this.router.navigate(['/chat']));
  }

  get alias() {
    return this.registrationForm.value.alias;
  }

  get name() {
    return this.registrationForm.value.name;
  }
}
