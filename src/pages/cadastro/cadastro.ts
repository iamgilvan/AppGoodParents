import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { transition } from '@angular/core/src/animation/dsl';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  usuario : any = {};
  photo: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public formBuilder : FormBuilder) 
  {
    this.usuario = this.formBuilder.group
    ({
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
        dtNascimento : ['', Validators.required],
        padrinho: ['', Validators.required]

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }
/*
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
 
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }
*/
  postDados()
  {
    console.log(this.usuario.value);

  }

}
