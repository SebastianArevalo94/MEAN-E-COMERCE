import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes: Array<any> = [];
  public apellidos = '';
  public correos = '';
  public page = 1;
  public pageSize = 20;
  public token;
  public load_data = true;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService
  ) {
      this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
    this.init_Data();
  }

  init_Data() {
    this._clienteService.get_clientes(null, null,this.token).subscribe(
      res => {
        this.clientes = res.data;
        this.load_data = false;
      }, err => {
        console.log(err)
      })
  }

  filtro(tipo: any) {

    let filtro;

    if (tipo == 'apellidos') {
      if (this.apellidos) {
        this.load_data = true;
        this._clienteService.get_clientes(tipo, this.apellidos,this.token).subscribe(
          res => {
            this.clientes = res.data;
            this.load_data = false;
          }, err => {
            console.log(err)
          })
      } else {
        this.init_Data();
      }
    }
    else if (tipo == 'correos') {
      if (this.correos) {
        this.load_data = true;
        this._clienteService.get_clientes(tipo, this.correos,this.token).subscribe(
          res => {
            this.clientes = res.data;
            this.load_data = false;
          }, err => {
            console.log(err)
          })
      } else {
        this.init_Data();
      }
    }
  }


  eliminar(id:any){
    this._clienteService.eliminar_cliente_admin(id,this.token).subscribe(
      res=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          color: '#fff',
          position: 'topRight',
          message: 'Cliente eliminado correctamente.'
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.init_Data();

      },
      err=>{
        console.log(err)
      }
    )
  }

  closeModal(id:any){
    $('#delete-'+id).modal('hide');
    $('.modal-backdrop').removeClass('show');
  }


}
