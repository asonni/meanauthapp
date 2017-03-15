import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginObj: Object; // Or you can set to login interface

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ){
    this.loginObj = {
      username: null,
      password: null
    }
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onLoginSubmit(){
    console.log(this.loginObj);
    this.authService.authenticateUser(this.loginObj).subscribe(data => {
      if(data.success){
        // this.toastr.success(data.msg, 'Success!');
        this.flashMessagesService.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['dashboard']);
      } else {
        this.toastr.error(data.msg, 'Error!');
        this.router.navigate(['login']);
      }
    });
  }
}

interface login {
  username: string;
  password: string;
}
