import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, NavParams, ItemSliding } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../login/login';
import { DetalhePage } from '../detalhe/detalhe';
import { EditarPage } from '../editar/editar';
import { MenuPage } from '../menu/menu';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public dataPrazo:       string = new Date(Date.UTC(2018, 12 - 1, 25)).toISOString();
  public usuarios:        any = [];
  public usersFiltrados:  any = [];
  public logado:          any = {};
  public loading;
  public facilidadeList:  any = [];
  public dificuldadeList: any = [];
  public esportesList:    any = [];
  public musicasList:     any = [];
  public filmesList:      any = [];
    

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
        // Aqui que a mágica acontece
        this.FiltraUsuario(result)
        //this.usuarios = result
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

  Deletar(id, slidingItem: ItemSliding) {
    slidingItem.close();
    this.userService.deleteUsuario(id)
      .then(() => {
        this.showLoader()
        this.mostraMenssagem('Aluno excluído com sucesso', 1000)
        setTimeout(() => {
          this.loading.dismissAll()
          this.usuarios = []
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

  FiltraUsuario(todosUsuarios)
  {
    this.facilidadeList   = this.logado.facilidade.split(',')
    this.dificuldadeList  = this.logado.dificuldade.split(',')
    this.esportesList     = this.logado.esportes.split(',')
    this.musicasList      = this.logado.musicas.split(',')  
    this.filmesList       = this.logado.filmes.split(',')  
    if (!this.logado.foto)
    {
      this.logado.foto = "assets/imgs/users-icon.png";
    }

    // iterar sobre todos os alunos
    for (let i = 0; i < todosUsuarios.length; i++)
    {
      // pegar o usuário atual
      var controle    = false;
      var alunoAtual  = todosUsuarios[i];

      if (!alunoAtual.foto)
      {
        alunoAtual.foto = "assets/imgs/users-icon.png";
      }
      // verificar se é do mesmo estado
      if (this.logado.estado === alunoAtual.estado)
      {
        this.usuarios.push(alunoAtual);
        continue;
      }
      // verificar se um aluno tem dificuldade em uma matéria e outro tem facilidade
      for (let f = 0; f <  this.facilidadeList.length; f++) 
      {
        var facilidade = this.facilidadeList[f];

        if(alunoAtual.dificuldade.toString().indexOf(facilidade) != -1)
        {
          this.usuarios.push(alunoAtual)
          controle = true;
          break;
        };
      }
      // verifica se aluno a foi adicionado na lista
      if(controle == true) {continue;}

      // verificar se um aluno tem dificuldade em uma matéria e outro tem facilidade
      for (let d = 0; d < this.dificuldadeList.length; d++) 
      {
        var dificuldade = this.dificuldadeList[d];

        if(alunoAtual.facilidade.toString().indexOf(dificuldade) != -1)
        {
          this.usuarios.push(alunoAtual)
          controle = true;
          break;
        };
      }

      // verifica se aluno a foi adicionado na lista
      if(controle == true) {continue;}

      // ver se alunos tem o mesmo gosto do esporte
      for (let e = 0; e < this.esportesList.length; e++) 
      {
        var esporte = this.esportesList[e];

        if(alunoAtual.esportes.toString().indexOf(esporte) != -1)
        {
          this.usuarios.push(alunoAtual)
          controle = true;
          break;
        };
      }

      // verifica se aluno a foi adicionado na lista
      if(controle == true) {continue;}

      // ver so o aluno tem o mesmos gostos por filmes
      for (let f = 0; f < this.filmesList.length; f++) 
      {
        var filme = this.filmesList[f];

        if(alunoAtual.filmes.toString().indexOf(filme) != -1)
        {
          this.usuarios.push(alunoAtual)
          controle = true;
          break;
        };
      }

      // verifica se aluno a foi adicionado na lista
      if(controle == true) {continue;}

      for (let m = 0; m < this.musicasList.length; m++) 
      {
        var musica = this.musicasList[m];

        if(alunoAtual.musicas.toString().indexOf(musica) != -1)
        {
          this.usuarios.push(alunoAtual)
          controle = true;
          break;
        };
      }
    }

  };

  Detalhe(user)
  {
    this.navCtrl.push(DetalhePage, user);
  };

  perfil(user)
  {
    this.navCtrl.push(MenuPage, user);
  };

  Editar(user)
  {
    this.navCtrl.push(EditarPage, user)
  };
}
