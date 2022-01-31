import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  public producto : any = {};
  public config : any = {};
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg'; 
  public load_btn = false;
  public id : any;
  public token : any = localStorage.getItem('token');
  public file:any=undefined;
  public url;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _router: Router
  ) {
    this.config = {
      heigth: 500
    }
    this.url = 'http://localhost:4201/api';
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._productoService.get_producto(this.id,this.token).subscribe(
          res=>{
            if(res.data==undefined){
              this.producto = undefined;
            } else {
              this.producto = res.data;
              this.imgSelect = `${this.url}/get_portada/${this.producto.portada}`
            }
          },
          err=>{
            console.log(err);
          }
        )
      }
    )
  }

  update(updateForm:any){
    if(updateForm.valid){
      var data : any = {};
      if(this.file!=undefined){
        data.portada = this.file;
      } 
      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.categoria = this.producto.categoria;
      data.descripcion = this.producto.descripcion;
      data.contenido = this.producto.contenido;
      this.load_btn = true;
      this._productoService.update_producto_admin(data,this.id,this.token).subscribe(
        res=> {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            color: '#fff',
            position: 'topRight',
            message: 'Producto actualizado correctamente.'
          });
          this.load_btn = false;
          this._router.navigate(['/panel/productos']);
        },
        err=> {
          console.log(err);
          this.load_btn = false;
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
      this.load_btn = false;
    }

  }

  fileChangeEvent(event:any):void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        color: '#fff',
        position: 'topRight',
        message: 'No hay imagen'
      });
    }

    if(this.file.size <= 4000000){
      if(this.file.type == 'image/png' || this.file.type == 'image/webp ' || this.file.type == 'image/jpg' || this.file.type == 'image/gif' || this.file.type == 'image/jpeg'){
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        reader.readAsDataURL(this.file);
        $('#input-img').text(this.file.name);

      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          color: '#fff',
          position: 'topRight',
          message: 'Formato de imagen no soportado.'
        })
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
        $('#input-img').text('Seleccionar imagen');
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        color: '#fff',
        position: 'topRight',
        message: 'Selecciona una imagen menor a 4MB'
      })
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
      $('#input-img').text('Seleccionar imagen');
    }

    

  }

}
