import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { stringify } from 'querystring';
import { MustMatch } from '../_helpers/must-match.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  errorMessage: string;
  isSuccessful = false;
  isSignUpFailed = false;
  

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              ) { }

  ngOnInit() {
    
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmpassword: [null, Validators.required],
      firstname: [null, Validators.required],
      confirmemail: [null, Validators.required],
      mobile: [null, Validators.required],
      confirmmobile: [null, Validators.required],
      usertype: [null, Validators.required],
      lastname: [null, Validators.required],
      fonction: [null],
      secteur: [null],
      civilite: [null,Validators.required],
      raisonsociale: [null],
      nomsociete: [null],
      clientcode: [null, Validators.required],
      role: [ {value: "basic", disabled: true},Validators.required],
    },
    {
      validator: [MustMatch('email','confirmemail'),MustMatch('mobile','confirmmobile')]
    });
  }

  onSignup() {
    this.loading = true;
    const email = this.signupForm.get('email').value;
    
    const mobile = this.signupForm.get('mobile').value;
    const usertype = this.signupForm.get('usertype').value;
    
    const password = this.signupForm.get('password').value;
    const confirmpassword = this.signupForm.get('confirmpassword').value;
    const firstname = this.signupForm.get('firstname').value;
    const lastname = this.signupForm.get('lastname').value;
    const fonction = this.signupForm.get('fonction').value;
    const secteur = this.signupForm.get('secteur').value;
    const civilite = this.signupForm.get('civilite').value;
    const raisonsociale = this.signupForm.get('raisonsociale').value;
    const nomsociete = this.signupForm.get('nomsociete').value;
    const clientcode = this.signupForm.get('clientcode').value;
    const role = this.signupForm.get('role').value;
    this.auth.register(email, password,confirmpassword,mobile,usertype,firstname,lastname,fonction,secteur,civilite,raisonsociale,nomsociete,clientcode,role).subscribe({

      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.loading = false;
        this.router.navigate(['login']);
      },
      error: error => {
        console.log(error);
        this.loading = false;
        this.errorMessage = JSON.stringify(error.error) ;
        this.isSignUpFailed = true;
      }
    });

  }
    
}