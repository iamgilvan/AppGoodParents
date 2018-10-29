import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
//import { Storage } from '@ionic/storage';

@Injectable()
export class LoginProvider {
  
  constructor(public http: Http){
    console.log('Hello LoginProvider Provider');
  }

  GetLoginApi(email, senha) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get('http://localhost:8080/user/login/' + email + '/' + senha, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
