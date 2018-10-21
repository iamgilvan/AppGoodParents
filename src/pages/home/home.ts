import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../login/login';
//import Moment from 'moment'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuarios: any = [];
  public loading
  //public moment: any = Moment;

  constructor(public navCtrl: NavController,
    public userService: UsersProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,) {

  }

  ionViewDidLoad() {
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

}
