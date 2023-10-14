import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginModels } from 'src/app/models/loginModels';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup

  constructor(private formbuilder: FormBuilder, 
    private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
      }
    );
  }
   
subimitLogin()
{
  debugger
  var dadosLogin = this.loginForm.getRawValue() as loginModels;
}

}
