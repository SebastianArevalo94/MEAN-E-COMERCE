import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly = 'http://localhost:4201/api'

  constructor(
    private _http: HttpClient
  ) {
    // this.url = global.url;
  }

  login_admin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.readonly}/login_admin`, data, { headers: headers })
  }

  getToken() {
    return localStorage.getItem('token');
  }


  public isAuthenticated(allowRoles : string[]):boolean{
 
    const token = localStorage.getItem('token');
 
    if(!token){
      return false;
    }
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);
   
      if(!decodedToken){
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      console.log(error)
      localStorage.removeItem('token');
      return false;
    }
    if(decodedToken.hasOwnProperty('role') ){
      return true
    } else {
      return false
    }
  }
}