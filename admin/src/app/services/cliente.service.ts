import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  readonly = 'http://localhost:4201/api'

  constructor(
    private _http: HttpClient
  ) {
    // this.url = global.url;
  }

  get_clientes(tipo:any,filtro:any,token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(`${this.readonly}/get_clientes/${tipo}/${filtro}`,{headers:headers})
  }

  registro_cliente_admin(data:any,token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(`${this.readonly}/registro_cliente_admin`,data,{headers:headers})
  }

  get_cliente(id:any,token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(`${this.readonly}/get_cliente/${id}`,{headers:headers})
  }

  actualizar_cliente_admin(id:any,data:any,token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(`${this.readonly}/actualizar_cliente_admin/${id}`,data,{headers:headers})
  }

  eliminar_cliente_admin(id:any,token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(`${this.readonly}/eliminar_cliente_admin/${id}`,{headers:headers})
  }
}
