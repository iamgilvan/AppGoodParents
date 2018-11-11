import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
import { CameraOptions, Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {
  private usuario : FormGroup;
  private logado : any = {};
  public  photo: string = '';

  constructor(public navCtrl: NavController,
    public userService: UsersProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public camera: Camera,
    public formBuilder : FormBuilder) 
 {
   this.logado = this.navParams.data
   this.usuario = this.formBuilder.group
   ({
       nome:         [null, Validators.required],
       sobrenome:    [null, Validators.required],
       email:        [null, Validators.required],
       senha:        [null, Validators.compose([Validators.minLength(4), Validators.maxLength(20), Validators.required])],
       nascimento :  [null, Validators.required],
       estado:       [null, Validators.required],
       padrinho:     [null, Validators.required],
       facilidade :  [null, Validators.required],
       dificuldade:  [null, Validators.required],
       esportes:     [null, Validators.required],
       musicas :     [null, Validators.required],
       descricao:    [null, Validators.required],
       filmes:       [null, Validators.required]
   });
 }

 takePicture() {
  this.photo = '';

  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    targetWidth: 100,
    targetHeight: 100
  }

  this.camera.getPicture(options)
    .then((imageData) => {
      let base64image = 'data:image/jpeg;base64,' + imageData;
      this.photo = base64image;
      console.log(this.photo);

    }, (error) => {
      console.error(error);
    })
    .catch((error) => {
      console.error(error);
    })
}

 postDados()
 {
   console.log(this.usuario.value)
   var novoValor = ', "foto":' + '\"' + this.photo + '\"}';
   var json = JSON.stringify(this.usuario.value).replace("}",novoValor); 
   this.userService.alterarUsuario(this.logado._id, json)
     .then((res) => {
       this.showToast('Usuário alterado com sucesso!', 1500);        
       this.navCtrl.setRoot(LoginPage);
     })
     .catch((err) => {
       //this.showToast('Falha ao conectar com o servidor!', 2500)
       console.error(err)
     });
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
