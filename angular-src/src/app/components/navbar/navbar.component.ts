import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    // this.toastr.success('You are logged out', 'Success!');
    this.flashMessagesService.show('You are logged out', {cssClass: 'alert-info', timeout: 3000});
    this.router.navigate(['login']);
    return false;
  }
}
