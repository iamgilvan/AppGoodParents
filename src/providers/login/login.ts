import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginProvider {
  private urlApi: string = 'https://good-parents-server.herokuapp.com/user/login/';
  constructor(public http: Http){}

  GetLoginApi(email: string, senha: string) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get(this.urlApi + email + '/' + senha, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
