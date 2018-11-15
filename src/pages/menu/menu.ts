import { Component } from '@angular/core';
import { IonicPage,  NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../login/login';
import { EditarPage } from '../editar/editar';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  public logado: any = {}
  public loading;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,public userService: UsersProvider,public loadingCtrl: LoadingController) {
    this.logado = this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  Deletar(id) {
    this.userService.deleteUsuario(id)
      .then(() => {
        this.showLoader()
        this.mostraMenssagem('Perfil excluído com sucesso', 1000)
        setTimeout(() => {
          this.loading.dismiss()
          this.navCtrl.setRoot(LoginPage)
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

  Editar(user)
  {
    this.navCtrl.push(EditarPage, user)
  };

}
