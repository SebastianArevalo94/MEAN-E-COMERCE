import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-create-productos',
  templateUrl: './create-productos.component.html',
  styleUrls: ['./create-productos.component.css']
})
export class CreateProductosComponent implements OnInit {

  public producto: any = {};
  public file:any=undefined;
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg'; 
  public config : any = {};
  public token : any;
  public load_btn = false;

  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService,
    private _router: Router
  ) {
    this.config = {
      heigth: 500
    }
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
  }

  registro(registroForm:any){
    if(registroForm.valid){
      if(this.file==undefined){
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          color: '#fff',
          position: 'topRight',
          message: 'Formulario incompleto, todos los campos deben estar llenos.'
        });

      } else {
        this.load_btn = true;
        this._productoService.registro_producto_admin(this.producto,this.file,this.token).subscribe(
          res=> {
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              class: 'text-success',
              color: '#fff',
              position: 'topRight',
              message: 'Producto registrado correctamente.'
            });
            this.load_btn = false;
            this._router.navigate(['/panel/productos']);
          },
          err=>{
            console.log(err);
            this.load_btn = false;
          }
        )
      }
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
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
      $('#input-img').text('Seleccionar imagen');
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
