import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  submitted = false;
  invalid = false
  constructor(private fb: FormBuilder,private providerservice : ProviderService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }
  get f() { return this.loginForm.controls; }

onSubmit() {
  this.submitted = true;
  if (this.loginForm.invalid) {
    console.log(this.f)
      return;
  }
  this.providerservice.loginProvider(this.loginForm.value).subscribe(data =>{
    if('token' in data && data['role']=="provider"){
      console.log(data['role'])
      localStorage.setItem('provider_token', data['token'])
      localStorage.setItem('access_role', data['role'])
      this.router.navigateByUrl('/')
    }
   })
}

}
