import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public data: any = {};
  public token : any = '';

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    if(this.token) this._router.navigate(['/inicio'])
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password
      }
      this._adminService.login_admin(data).subscribe(
        res => {
          this.data = res.data;
          console.log(this.data)
          localStorage.setItem('token',res.token);
          localStorage.setItem('_id',res.data._id);
          this._router.navigate(['/'])
          iziToast.show({
            title: 'LOGGED IN',
            titleColor: '#008000',
            class: 'text-danger',
            color: '#fff',
            position: 'topRight',
            message: res.message
          })
        },
        err => {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            class: 'text-danger',
            color: '#fff',
            position: 'topRight',
            message: err.error.message
          })
        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        color: '#fff',
        position: 'topRight',
        message: 'Formulario incompleto, todos los campos deben estar llenos.'
      })
    }
  }

}
