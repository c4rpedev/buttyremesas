import { Component, OnInit, Inject, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {  
  
  
  img: String;
  
             // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

    constructor( 
                private router: Router,
                
                public auth: AuthService,
                @Inject(DOCUMENT) public document: Document) {
        
    }
    
  ngOnInit(): void {
 
    
    
   }
  
 
  logout(): void {
    //this.afAuth.signOut();
  }
  openSettings(){
    this.router.navigateByUrl('/edit-profile');
  }
  
}
