import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegsiter(user)){
      // this.flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      this.toastr.error('Please fill in all fields', 'Error!');
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      // this.flashMessagesService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      this.toastr.error('Please use a valid email', 'Error!');
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessagesService.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // this.toastr.success('You are now registered and can log in', 'Success!');
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // this.toastr.error('Something went wrong', 'Error!');
        this.router.navigate(['/register']);
      }
    });
  }

}







