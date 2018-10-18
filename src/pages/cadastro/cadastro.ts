import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
//import { UsersProvider } from '../../providers/users/users';
import { transition } from '@angular/core/src/animation/dsl';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  private usuario : FormGroup;

  constructor(public navCtrl: NavController,
     //public userService: UsersProvider,
     public navParams: NavParams,
     public formBuilder : FormBuilder) 
  {
    this.usuario = this.formBuilder.group
    ({
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        email: ['', Validators.required],
        senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
        nascimento : ['', Validators.required],
        padrinho: ['', Validators.required],
        estado: ['', Validators.required],
        facilidade : ['', Validators.required],
        dificuldade: ['', Validators.required],
        esportes: ['', Validators.required],
        musicas : ['', Validators.required],
        descricao: ['', Validators.required],
        filmes: ['', Validators.required]

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  postDados()
  {
    //this.userService.createUsers(this.usuario);
    console.log(this.usuario.value);
  }

  addReview(){
 
    
 
  }

}
