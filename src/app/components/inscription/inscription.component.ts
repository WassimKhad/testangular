import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import{MustMatch} from './must-match.validator'

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  imageSrc: string;
  fileSource:any

  constructor(private fb: FormBuilder,private authservice : AuthService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      file : ['']
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });
  }
  get f() { return this.registerForm.controls; }
  onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      this.fileSource= event.target.files[0];
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

      };

    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log("invalid form")
        return;
    }
    this.authservice.register(this.registerForm.value).subscribe(data =>{
      if(data['message']="succefly added"){
       alert('you are added with success');
       this.router.navigate(['/login'])

      }
     })
    }

}
