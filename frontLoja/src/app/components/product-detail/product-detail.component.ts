import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/user.service';
import { ShirtService } from '../../services/shirt.service';
import { Router } from '../../../../node_modules/@angular/router';
import { User } from '../../entidades/user';
import { Shirt } from '../../entidades/shirt';
import { Purchase } from '../../entidades/purchase';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // User Session
  userSignIn: User;
  bagShirtUser: any;
  shirtPresentation: Shirt;
  userPresentation: User;
  sliderBag: any;
  imageUserDefault: string;

  // Purchase Class
  purchase: Purchase;
  cupom : string;
  cep : string;

  constructor(private userService: UsuarioService, private shirtService: ShirtService,
    private router: Router, private purchaseService : PurchaseService) {
    
    this.userSignIn = new User();
    this.purchase = new Purchase();
    this.purchase.priceDelivery = "0";
    this.purchase.discount = "0";
    this.purchase.totalPrice = "0";
    this.purchase.qtdShirts = "1";
    this.bagShirtUser = [];
    this.shirtPresentation = new Shirt();
    this.userPresentation = new User();
    this.imageUserDefault = "../../../assets/img/core-img/logo.png";
    this.sliderBag = [];
    this.cupom = "DES10";
    this.cep = "1234";
    this.purchase.cepDelivery = this.cep;

  }


  ngOnInit() {

    //Verify User Login
    this.userService.getUserSession()
      .subscribe(
        (data) => {
          this.userSignIn = data[0];

          this.shirtService.getBagUser(this.userSignIn._id)
            .subscribe(
              (data) => {

                this.bagShirtUser = data;
                this.shirtPresentation = this.bagShirtUser[0].shirt;
                this.userPresentation = this.bagShirtUser[0].author;

                if (this.userPresentation.imageUser == undefined) {
                  this.userPresentation.imageUser = this.imageUserDefault;
                }

                this.purchase.totalPrice = (parseFloat(this.shirtPresentation.shirtPriceSell) + parseFloat(this.purchase.priceDelivery) - parseFloat(this.purchase.discount)).toString();
                this.purchase.shirtId =  this.shirtPresentation._id;
                this.purchase.clientId = this.userPresentation._id;

                this.bagShirtUser.forEach(element => {
                  this.sliderBag.push(element);
                });

              },
              (error) => {

                console.log(error);
              }
            );

        },
        (error) => {

          window.location.href = "/cadastro";
          alert("Necessário fazer o Login na Sua Conta");
        }
      );
    // End Verify User Login
  }

  // Calculate Cupom 
  getCupom() {

    if ("DES10" == this.cupom) {
      this.purchase.discount  = "10";
      this.purchase.totalPrice = (parseFloat(this.shirtPresentation.shirtPriceSell) + parseFloat(this.purchase.priceDelivery) - parseFloat(this.purchase.discount)).toString(); 
    } else if ("DES20" == this.cupom) {
      this.purchase.discount  = "20";
      this.purchase.totalPrice = (parseFloat(this.shirtPresentation.shirtPriceSell) + parseFloat(this.purchase.priceDelivery) - parseFloat(this.purchase.discount)).toString(); 
    }else{
      this.purchase.discount  = "5";
      this.purchase.totalPrice = (parseFloat(this.shirtPresentation.shirtPriceSell) + parseFloat(this.purchase.priceDelivery) - parseFloat(this.purchase.discount)).toString(); 
    } 

    this.purchase.cepDelivery = this.cep;
  }

   // Calculate Frete 
   getFrete() {
    console.log(this.cep);
    if ("1234"== this.cep) {
      this.purchase.priceDelivery  = "10";
      this.purchase.totalPrice = (parseFloat(this.shirtPresentation.shirtPriceSell) + parseFloat(this.purchase.priceDelivery) - parseFloat(this.purchase.discount)).toString(); 
    }else{
      this.purchase.discount  = "15";
      this.purchase.totalPrice = (parseFloat(this.shirtPresentation.shirtPriceSell) + parseFloat(this.purchase.priceDelivery) - parseFloat(this.purchase.discount)).toString(); 
    }

  }

  // Change Shirt Bag 
  changeShirtBag(item: any) {
    console.log(item.author);
    this.shirtPresentation = item.shirt;
    this.userPresentation = item.author;

    this.purchase.shirtId =  this.shirtPresentation._id;
    this.purchase.clientId = this.userPresentation._id;
    this.purchase.totalPrice = (parseFloat(this.shirtPresentation.shirtPriceSell) + parseFloat(this.purchase.priceDelivery) - parseFloat(this.purchase.discount)).toString();
  }

  // Go to Shop Client
  goToShopClient(){

    this.userService.getUserById(this.userPresentation._id)
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

  // Finish  Buy
  finishBuy(){

    this.purchase.shirtName = this.shirtPresentation.titleShirt;
    this.purchaseService.savePurchase(this.purchase)
    .subscribe(
      (data) => {

          console.log(data);
          window.location.href = "/shop";
          alert("Compra Realizada com Sucesso !");
      },
      (error) => {

        console.log(error);
      }
    );

  }
}
