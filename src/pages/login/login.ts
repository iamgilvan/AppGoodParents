import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { CadastroPage } from '../cadastro/cadastro';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: any;
  messageEmail    = ""
  messagePassword = "";
  errorEmail      = false;
  errorPassword   = false;

  /*constructor(public navCtrl: NavController, public navParams: NavParams) {
  }*/

  constructor(public navCtrl: NavController, formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let { email, password } = this.loginForm.controls;
 
    if (!this.loginForm.valid) {
      if (!email.valid) {
        this.errorEmail   = true;
        this.messageEmail = "Ops! Email inválido";
      } else {
        this.messageEmail = "";
      }
 
      if (!password.valid) {
        this.errorPassword = true;
        this.messagePassword ="A senha precisa ter de 6 a 20 caracteres"
      } else {
        this.messagePassword = "";
      }
    }
    else {
      alert("Login Realizado");
    }
  }

  pushPage(){
    this.navCtrl.push(CadastroPage);
  }
}
