import { Component, OnInit } from '@angular/core';
import { User } from '../../entidades/user';
import { FormBuilder } from '../../../../node_modules/@angular/forms';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Variables Change Portlets Dashboard
  hideResumeScreen: Boolean;
  hidePerfilScreen: Boolean;
  hidePedidosScreen: Boolean;
  hideMyShirtsScreen: Boolean;
 

  //Variables Change Client
  userModified: User;

  constructor() {
      this.userModified = new User();
   }

  ngOnInit() {

    //Init set Portlets Dashboard
    this.hideResumeScreen = true;
    this.hidePerfilScreen = false;
    this.hidePedidosScreen = false;
    this.hideMyShirtsScreen = false;

  }

  //Change Screen Dash Board
  changeScreen(type: string) {

    //Set all Screen to false
    this.hideResumeScreen = false;
    this.hidePerfilScreen = false;
    this.hidePedidosScreen = false;
    this.hideMyShirtsScreen = false;

    //Show choose Screen

    if (type == "RESUME") {
      this.hideResumeScreen = true;
    } else if (type == "PERFIL") {
      this.hidePerfilScreen = true;
    } else if (type == "PEDIDO") {
      this.hidePedidosScreen = true;
    } else if (type == "SHIRTS") {
      this.hideMyShirtsScreen = true;
    }

  }

  //Change Image Perfil Client
  readImagePerfilClient(event) {

    let url = new Image();
    let reader = new FileReader();
    let file = event.target.files[0];
    let imageType = /image.*/;

    if (file.type.match(imageType)) {

      reader.onload = (event: any) => {
        let src = event.target.result;
        $(".image-container").attr("src", src);
        this.userModified.imageUser = src;
      }

      reader.readAsDataURL(file);
    }
  }

  // Change Capa perfil client
  readImageCapa(event) {

    let url = new Image();
    let reader = new FileReader();
    let file = event.target.files[0];
    let imageType = /image.*/;

    if (file.type.match(imageType)) {

      reader.onload = (event: any) => {
        let src = event.target.result;
        $(".image-container").attr("src", src);
        this.userModified.imageSite = src;
      }

      reader.readAsDataURL(file);
    }
  }

  // Atualizar Perfil Usuário
  atualizarPerfil(){

    console.log(this.userModified);
  }
}
