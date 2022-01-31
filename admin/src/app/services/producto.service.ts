import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  readonly = 'http://localhost:4201/api'

  constructor(
    private _http: HttpClient
  ) {
    // this.url = global.url;
  }

  registro_producto_admin(data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token });
    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('stock', data.stock);
    fd.append('precio', data.precio);
    fd.append('descripcion', data.descripcion);
    fd.append('contenido', data.contenido);
    fd.append('categoria', data.categoria);
    fd.append('portada', file);
    return this._http.post(`${this.readonly}/registro_producto_admin`, fd, { headers: headers })
  }

  listar_productos_admin(filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(`${this.readonly}/listar_productos_admin/${filtro}`, { headers: headers })
  }

  get_producto(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(`${this.readonly}/get_producto/${id}`, { headers: headers })
  }

  update_producto_admin(data: any, id: any, token: any): Observable<any> {
    if(data.portada){
      let headers = new HttpHeaders({ 'Authorization': token });
      const fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('stock', data.stock);
      fd.append('precio', data.precio);
      fd.append('descripcion', data.descripcion);
      fd.append('contenido', data.contenido);
      fd.append('categoria', data.categoria);
      fd.append('portada', data.portada);
      return this._http.put(`${this.readonly}/update_producto_admin/${id}`, fd, { headers: headers })
    } else {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
      return this._http.put(`${this.readonly}/update_producto_admin/${id}`, data, { headers: headers })
    }
  }

  eliminar_producto_admin(id:any,token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(`${this.readonly}/eliminar_producto_admin/${id}`,{headers:headers})
  }

  listar_inventario_producto_admin(id:any,token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(`${this.readonly}/listar_inventario_producto_admin/${id}`,{headers:headers})
  }

  eliminar_inventario_producto_admin(id:any,token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(`${this.readonly}/eliminar_inventario_producto_admin/${id}`,{headers:headers})
  }
  

  registro_inventario_producto_admin(data:any,token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(`${this.readonly}/registro_inventario_producto_admin`,data,{headers:headers})
  }

}
