import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { Camera } from '@ionic-native/camera'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from "../pages/cadastro/cadastro";
import { DetalhePage } from '../pages/detalhe/detalhe';
import { MenuPage } from '../pages/menu/menu';
import { EditarPage } from '../pages/editar/editar';

import { DetalhePageModule } from '../pages/detalhe/detalhe.module';
import { MenuPageModule } from '../pages/menu/menu.module';
import { EditarPageModule } from '../pages/editar/editar.module';
import { LoginPageModule} from '../pages/login/login.module';
import { CadastroPageModule } from "../pages/cadastro/cadastro.module";

import { UsersProvider } from '../providers/users/users';
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    CadastroPageModule,
    DetalhePageModule,
    EditarPageModule,
    LoginPageModule,
    MenuPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    DetalhePage,
    MenuPage,
    EditarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    LoginProvider,
    Camera,
  ]
})
export class AppModule {}
