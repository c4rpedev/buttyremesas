import { AnimationDriver } from '@angular/animations/browser';
import { Inject, Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { updateLanguageServiceSourceFile } from 'typescript';

@Injectable({
    providedIn: 'root'
})
export class AuthServices {
  
    users: String;
    userLoggedIn: boolean;      // other components can check on this variable for the login status of the user

    constructor(private router: Router, 
        public auth: AuthService,
                @Inject(DOCUMENT) public document: Document
                ) {
        
    }

    getUser(): String{
        
        this.auth.user$.subscribe(user =>{
            this.users= user.nickname;
            return this.users;
          })
          return this.users;
        
    }

   
}
