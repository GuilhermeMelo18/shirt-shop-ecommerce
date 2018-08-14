import { Component, OnInit } from '@angular/core';
import { User } from '../../entidades/user';
import { FormBuilder } from '../../../../node_modules/@angular/forms';
import { UsuarioService } from '../../services/user.service';
import { PurchaseService } from '../../services/purchase.service';
import { ShirtService } from '../../services/shirt.service';
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

  // Variables Purchases Demands
  purchasesDemandsByUser: any;


  //Variables Change Client
  userModified: User;
  shirtByIdClient : any;
  userlikesGain : any;


  constructor(private userService: UsuarioService, private purchaseService: PurchaseService,
    private shirtService: ShirtService) {
    this.userModified = new User();
  }

  ngOnInit() {

    //Init set Portlets Dashboard
    this.hideResumeScreen = true;
    this.hidePerfilScreen = false;
    this.hidePedidosScreen = false;
    this.hideMyShirtsScreen = false;

    this.userService.getUserSession()
      .subscribe(
        (data) => {
          this.userModified = data[0];

          // Get All Demands By User  
          this.purchaseService.getAllDemandsByUser(this.userModified._id)
            .subscribe(
              (data) => {
                this.purchasesDemandsByUser = data;
              },
              (error) => {
                console.log(error);
              }
            );

          // Get All Shirts By User
          this.shirtService.getShirtByIdUser(this.userModified._id)
            .subscribe(
              (data) => {
                this.shirtByIdClient = data;
              },
              (error) => {
                console.log(error);
              }
            );
           // Get All Shirts By User
           this.userService.getUserLikesGain(this.userModified._id)
           .subscribe(
             (data) => {
               this.userlikesGain = data;
             },
             (error) => {
               console.log(error);
             }
           );
        },
        (error) => {
          console.log(error);
          //this.router.navigateByUrl('/cadastro');
          window.location.href = "/cadastro";
          alert("Necessário fazer o Login na Sua Conta");
        }
      );
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
  atualizarPerfil() {

    this.userService.updateUser(this.userModified._id, this.userModified)
      .subscribe(
        (data) => {
          console.log(data);
          alert("Perfil Atualizado com Sucesso !");
          window.location.href = "/dashboard";
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // Go to Shop Client
  goToShopClient() {

    if (this.userModified._id != undefined) {

      this.userService.getUserById(this.userModified._id)
        .subscribe(
          (data) => {
            //this.router.navigateByUrl('/shop');
            window.location.href = "/client-shop";
          },
          (error) => {
            console.log(error);
          }
        );
    }

  }

  // Remove User Shirt
  removeShirt(id : string){
    this.shirtService.removeShirt(id)
    .subscribe(
      (data) => {
        console.log(data);
        alert("Camisa Removida com Sucesso !");
        window.location.href = "/dashboard";
      },
      (error) => {
        console.log(error);
      }
    );
  } 


}
