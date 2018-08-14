import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/user.service';
import { ShirtService } from '../../services/shirt.service';
import { Router } from '@angular/router';
import { User } from '../../entidades/user';
import { Shirt } from '../../entidades/shirt';

declare var $: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  // Colletion Shirt Shopping
  collectionShirt: any;
  currentColletionShirt: any;

  // Shirt Send to Quick View
  shirtQuickView: Shirt;

  //User SignIn
  userSignIn: User;
  priceFilter: String;
  stringFilter: String;
  userDefault: User;

  documentReady = false;

  constructor(private userService: UsuarioService, private shirtService: ShirtService,
    private router: Router) {

    this.userSignIn = new User();
    this.shirtQuickView = new Shirt();
    this.priceFilter = "50";

    // User Default Config
    this.userDefault = new User();
    this.userDefault.imageUser = "../../../assets/img/core-img/logo.png";
    this.userDefault.imageSite = "../../../assets/img/core-img/wall-paper.jpg";
    this.userDefault.description = "Customizer";


  }

  ngOnInit() {
    //Content Class
    let _content = this;

    //Slider Range 
    $(".range-price").slider({
      range: "min",
      min: 44.99,
      max: 90.99,
      step: 0.01,
      value: 60,
      slide: function (event, ui) {
        _content.priceFilter = ui.value;
      }
    });

    $(document).ready(function () {
      this.documentReady = true;
    });

    // Get Shirts from Service
    this.shirtService.getShirts()
      .subscribe(
        (data) => {
          //console.log(data);
          // Charge Colletion Shirt
          this.currentColletionShirt = data;
          this.chargeShirts(this.currentColletionShirt);

          console.log(this.shirtService.saveFilterShirts);
          if (this.shirtService.saveFilterShirts != undefined) {
            this.filterByTag(this.shirtService.saveFilterShirts);
          }

        },
        (error) => {
          console.log(error);
        }
      );
  }

  // Send Product to QuickView
  sendImageQuikcView(shirt: Shirt) {
    //console.log(shirt);
    this.shirtQuickView = shirt;
  }

  // FUNCTION PAGE UP 
  pageUp() {
    window.scrollTo(0, 0);

  }

  // FILTERS ******************//

  chargeShirts(currentShirts: any) {

    this.collectionShirt = currentShirts;
  }

  // Add Shirt to Bag User 
  addBagUser() {

    this.userService.getUserSession()
      .subscribe(
        (data) => {

          this.shirtService.addBagUser(data[0]._id, this.shirtQuickView._id)
            .subscribe(
              (data) => {
                console.log(data);
                //this.router.navigateByUrl('/product-detail');
                window.location.href = "/product-detail";

              },
              (error) => {
                console.log(error);
              }
            );

          this.currentColletionShirt = data;
          this.chargeShirts(this.currentColletionShirt);
        },
        (error) => {
          console.log(error);
          // this.router.navigateByUrl('/cadastro');
          window.location.href = "/cadastro";
          alert("Necessário fazer o Login na Sua Conta");
        }
      );

  }

  //FilterByTag
  filterByTag(tag: String) {

    var filterShirt = [];
    console.log(tag);

    this.currentColletionShirt.forEach(shirt => {
      shirt.arrayTags.forEach(element => {
        if (tag == element) {
          filterShirt.push(shirt);
        }
      });
    });

    console.log(filterShirt);
    this.chargeShirts(filterShirt);
  }

  // Filter By Price
  filterByprice() {

    var filterShirt = [];
    this.currentColletionShirt.forEach(shirt => {
      if (shirt.shirtPriceSell < this.priceFilter) {
        filterShirt.push(shirt);
      }

    });

    this.chargeShirts(filterShirt);
  }

  // Filter By Color
  filterByColor(tag: String) {

    var filterShirt = [];
    this.currentColletionShirt.forEach(shirt => {
      if (shirt.colorShirt == tag) {
        filterShirt.push(shirt);
      }

    });

    this.chargeShirts(filterShirt);
  }

  // Filter By Model
  filterByModel(tag: String) {

    var filterShirt = [];
    this.currentColletionShirt.forEach(shirt => {
      if (shirt.modelShirt == tag) {
        filterShirt.push(shirt);
      }

    });

    this.chargeShirts(filterShirt);
  }

  // Filter By String
  filterByString() {

    var filterShirt = [];
    this.currentColletionShirt.forEach(shirt => {
      var shirtUserTitle = shirt.titleShirt.toLowerCase();
      var shirtTitleFilter = this.stringFilter.toLowerCase();

      if (shirtUserTitle.includes(shirtTitleFilter)) {
        filterShirt.push(shirt);
      }

    });

    this.chargeShirts(filterShirt);
  }

  // likes shirt
  likesShirt(id: string) {

    this.shirtService.likeShirts(id)
    .subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );


  }

}
