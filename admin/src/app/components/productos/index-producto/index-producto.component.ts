import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public load_data = true;
  public filtro = '';
  public token;
  public productos: Array<any> = [];
  public url;
  public page = 1;
  public pageSize = 20;
  public load_btn = false;

  constructor(
    private _productoService: ProductoService
  ) {
    this.token = localStorage.getItem('token');
    this.url = 'http://localhost:4201/api';
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(
      res => {
        this.productos = res.data;
        this.load_data = false;
      },
      err => {
        console.log(err);
      }
    )
  }

  filtrar() {
    if (this.filtro) {
      this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(
        res => {
          console.log(res);
          this.productos = res.data;
          this.load_data = false;
        },
        err => {
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
        message: 'Ingrese un filtro para buscar'
      });
    }
  }

  resetear(){
    this.filtro = '';
    this.init_data();
  }

  eliminar(id:any){
    this.load_btn = true;
    this._productoService.eliminar_producto_admin(id,this.token).subscribe(
      res=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          color: '#fff',
          position: 'topRight',
          message: 'Producto eliminado correctamente.'
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.load_btn = false;
        this.init_data();

      },
      err=>{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          color: '#fff',
          position: 'topRight',
          message: 'Hubo un error interno en el servidor.'
        });
        console.log(err);
        this.load_btn = true;
      }
    )
  }

  closeModal(id:any){
    $('#delete-'+id).modal('hide');
    $('.modal-backdrop').removeClass('show');
  }

}
