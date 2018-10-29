import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersProvider {

  constructor(public http: Http) { }

  createUser(credential){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://localhost:8080/user', JSON.stringify(credential), {headers: headers})
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

      this.http.get('http://localhost:8080/user', {headers: headers})
        .subscribe(res => {
          let data = res.json()
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteUsuario(id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.delete('http://localhost:8080/user/' + id, {headers: headers})
        .subscribe( res => {
          let data = res.json()
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  alterarUsuario(id, credential){
    return new Promise((resolve, reject) => {
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.put('http://localhost:8080/user/' + id, JSON.stringify(credential) , {headers: headers})
      .subscribe( res => {
        let data = res.json()
        resolve(data);
      }, (err) => {
        reject(err);
      });

    });
    
  }

}
