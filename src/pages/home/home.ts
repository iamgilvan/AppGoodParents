import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../login/login';
//import Moment from 'moment'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public dataPrazo: string = new Date(Date.UTC(2018, 9 - 1, 25)).toISOString();
  public usuarios: any = [];
  public logado: any = {};
  public loading

  constructor(public navCtrl: NavController,
    public userService: UsersProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,) {

  }

  ionViewDidLoad() {
    this.logado = this.navParams.data;
    this.getAllUsuarios()
  }

  getAllUsuarios() {
    this.showLoader()
    this.userService.getUsuarios()
      .then((result) => {
        this.loading.dismiss()
        this.usuarios = result
        console.log(this.usuarios)
      })
      .catch((err) => {
        this.loading.dismiss()
        if (err.status === 401) {
          this.navCtrl.setRoot(LoginPage)
        } else if (err.status === 404) {
          this.usuarios = []
          this.showToast('Nenhum produto encontrado para a pesquisa!', 2500)
        } else {
          this.showToast('Falha ao conectar com o servidor!', 2500)
        }
      })
  }

  deletar(id) {
    this.userService.deleteUsuario(id)
      .then(() => {
        this.showLoader()
        this.mostraMenssagem('Produto excluído com sucesso', 1000)
        setTimeout(() => {
          this.loading.dismiss()
          this.getAllUsuarios()
        }, 1000);
      })
      .catch((err) => {
        this.showToast('Falha ao conectar com o servidor!', 2500)
      })
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    this.loading.present();
  }

  showToast(message: string, duration?: number) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  };

  mostraMenssagem(message: string, duration?: number) {
    let menssagem = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    menssagem.present();
  }

}
