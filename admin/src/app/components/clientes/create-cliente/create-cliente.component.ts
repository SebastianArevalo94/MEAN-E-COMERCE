import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public cliente : any = {
    genero: ''
  };
  public token;
  public load_btn = false;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ) { 
    this.token=_adminService.getToken();
  }

  ngOnInit(): void {
  }

  registro(registroForm:any){
    if(registroForm.valid){
      this.load_btn = true;
      this._clienteService.registro_cliente_admin(this.cliente,this.token).subscribe(
        res=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            color: '#fff',
            position: 'topRight',
            message: 'Cliente registrado correctamente.'
          });
          this.cliente={
            genero:'',
            nombres:'',
            apellidos:'',
            f_nacimiento:'',
            telefono:'',
            dni:'',
            email:''
          }
          this.load_btn = true;
          this._router.navigate(['/panel/clientes']);
        },
        err=>{
          console.log(err);
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
