import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersProvider {
  private _urlApi: string = 'https://good-parents-server.herokuapp.com/user';
  private _urlApiAlternativa: string = 'https://good-parents-server.herokuapp.com/user/';
  constructor(public http: Http) { }

  createUser(credential : string ){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this._urlApi, credential, {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUsuarios(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get(this._urlApi, {headers: headers})
        .subscribe(res => {
          let data = res.json()
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteUsuario(id: string){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.delete(this._urlApiAlternativa + id, {headers: headers})
        .subscribe( res => {
          let data = res.json()
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  alterarUsuario(id : string, credential: string){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.put(this._urlApiAlternativa + id, credential , {headers: headers})
      .subscribe( res => {
        let data = res.json()
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }
}
