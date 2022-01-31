import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})

export class InventarioProductoComponent implements OnInit {

  public id: any;
  public token: any;
  public id_user : any;
  public producto: any = {};
  public inventarios: Array<any> = [];
  public load_btn = false;
  public inventario: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _router: Router
  ) {
    this.token = localStorage.getItem('token');
    this.id_user = localStorage.getItem('_id');
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._productoService.get_producto(this.id, this.token).subscribe(
          res => {
            if (res.data == undefined) {
              this.producto = undefined;
            } else {
              this.producto = res.data;
              this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
                res=>{
                  this.inventarios = res.data;
                },
                err=>{
                  console.log(err)
                }
              )
            }
          },
          err => {
            console.log(err);
          }
        )
      }
    )
  }

  eliminar(id:any){
    this.load_btn = true;
    this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe(
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
        this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
          res=>{
            this.inventarios = res.data;
          },
          err=>{
            console.log(err)
          }
        )

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

  registro_inventario(inventarioForm:any){
    if(inventarioForm.valid){
      let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this.id_user,
        proveedor: inventarioForm.value.proveedor
      }
      console.log(data)
      this._productoService.registro_inventario_producto_admin(data,this.token).subscribe(
        res=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            color: '#fff',
            position: 'topRight',
            message: 'Stock agregado correctamente'
          });
          this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
            res=>{
              this.inventarios = res.data;
            },
            err=>{
              console.log(err)
            }
          )
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
      });
    }
  }


}
