import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
import { CameraOptions, Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  private usuario : FormGroup;
  public  photo: string = '';

  constructor(public navCtrl: NavController,
     public userService: UsersProvider,
     public alertController: AlertController,
     public toastCtrl: ToastController,
     public navParams: NavParams,
     public camera: Camera,
     public formBuilder : FormBuilder) 
  {
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
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  postDados()
  {
    if (this.usuario.value.descricao)
    {
      // Mostrar mensagem para padrinho
      if(this.usuario.value.padrinho === "true") {this.mostrarCadastroAlerta()}
      
      var novoValor = ', "foto":' + '\"' + this.photo + '\"}';
      var json = JSON.stringify(this.usuario.value).replace("}",novoValor); 
      this.userService.createUser(json)
        .then((res) => {
          this.showToast('Usuário cadastrado com sucesso!', 1500);        
          this.navCtrl.setRoot(LoginPage);
        })
        .catch((err) => {
            this.showToast('Falha ao conectar com o servidor!', 2500)
            console.error(err)
        });
    }

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

  async mostrarCadastroAlerta()
  {
    const alert = await this.alertController.create({
      title: "Padrinho/Madrinha",
      message: '<strong>Conheça o papel de um padrinho/madrinha e ao assumir o compromisso esteja certo de suas possibilidades nesse processo:</strong>'+
      '<p>- Tenha noção que ser padrinho/madrinha requer disponibilidade de tempo, então assuma afilhados de acordo com o seu tempo disponível para dedicar-se ao mesmo.</p>'+
      '<p>- Os afilhados não são propriedades e nem exclusivos dos padrinhos. Deixe seu afilhado livre para viver e aprender com seus atos, mas esteja por perto sempre que necessário.</p>'+
      '<p>- A relação de cuidado e zelo precisa acontecer sem que o afilhado seja podado de escolhas e decisões. Conselhos são bem-vindos; imposições não.</p>'+
      '<p>- Procure entender seu afilhado antes de criticá-lo ou reprimi-lo. Talvez o afilhado esteja esperando as primeiras palavras de compreensão de você.</p>'+
      '<p>- Tente construir uma relação e criar vínculos antes do título de padrinho/madrinha.</p>'+
      '<p>- Afilhados oficiais não são menos importantes que os afilhados extraoficiais (afetivo). Tente construir a relação com o afilhado aos poucos até que sinta a relação com uma base sólida para daí oficializar o título.</p>'+
      '<p>- Afilhados extraoficiais não excluem o oficial. Cada um deles precisa ter o seu espaço e tempo.</p>'+
      '<p>- Mesmo que o seu afilhado não seja do jeito que você imaginava, aproveite a oportunidade de conhecer melhor a pessoa.</p>'+
      '<p>- Valorize as relações de afeto na nossa escola. Elas auxiliam no desenvolvimento de um indivíduo mais fortalecido para enfrentar as adversidades.</p>',
      buttons: ['OK']
    });

    alert.present();
  }

}
