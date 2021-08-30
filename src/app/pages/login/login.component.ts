import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/core/models/user';


import { Router } from '@angular/router';
//import { AuthService } from '../../core/services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '@auth0/auth0-angular';
import { SmsService } from 'src/app/core/services/sms.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;

  isProgressVisible: boolean;
  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(  
               
               private router: Router,                
               public auth: AuthService) { 
    this.isProgressVisible = false;

    this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', Validators.required)
    });

    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    // if (this.authService.userLoggedIn) {                       // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
    //   this.router.navigate(['/']);
    // }
    
  }

  get emailInvalid(){
    return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
  }

  get passwordInvalid(){
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  loginUser() {
    this.isProgressVisible = true;                          // show the progress indicator as we start the Firebase login process

    if (this.loginForm.invalid)
        return;

    // this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
    //     this.isProgressVisible = false;                     // no matter what, when the auth service returns, we hide the progress indicator
    //     if (result == null) {                               // null is success, false means there was an error
    //         console.log('logging in...');
    //         this.router.navigate(['/']);                // when the user is logged in, navigate them to dashboard
    //     }
    //     else if (result.isValid == false) {
    //         console.log('login error', result);
    //         this.firebaseErrorMessage = result.message;
    //     }
    // });
    
}


}
