import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public usuario: any = []

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loginProvider: LoginProvider,
    public toastCtrl: ToastController) {
  
    this.loginForm = formBuilder.group({
      email:    ['', Validators.required],
      senha:    ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {

    console.log(this.loginForm.value);
    this.loginProvider.GetLoginApi(this.loginForm.value.email, this.loginForm.value.senha)
      .then((resultado) => {
        this.usuario = JSON.parse(resultado["_body"].replace("[", "").replace("]",""));
        
        // verificar se usuário pode fazer login
        if(this.usuario.padrinho === false)
        {
          this.showToast('Área destinada a padrinhos!', 2500)
          this.usuario = [];
        }else
        {
          // Passando o usuário logado como parametro
          //this.navCtrl.push(HomePage, this.usuario);
          this.navCtrl.setRoot(HomePage, this.usuario);
          this.showToast('Bem vindo!', 1500)
        }
        
      })
      .catch((err) => {
        this.showToast('Falha ao conectar com o servidor!', 2500)
        console.error(err)
      })
  }

  pushPage(){
    this.navCtrl.push(CadastroPage);
  }

  showToast(message: string, duration?: number) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  }
}
