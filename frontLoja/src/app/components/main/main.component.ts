import { Component, OnInit } from '@angular/core';
import { User } from '../../entidades/user';
import { UsuarioService } from '../../services/user.service';
import { ShirtService } from '../../services/shirt.service';
import { Router } from '@angular/router';
import { Shirt } from '../../entidades/shirt';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //Colletions Shirts
  topShirtsCollection: any;
  shirtQuickView: Shirt;

  constructor(private userService: UsuarioService, private shirtService: ShirtService,
    private router: Router) {
    this.shirtQuickView = new Shirt();
  }

  ngOnInit() {

    this.shirtService.getTopLikedShirts()
      .subscribe(
        (data) => {
          //console.log(data);
          // Charge Colletion Shirt
          this.topShirtsCollection = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // Filter Shirts By Tag
  filterByTag(tag: string) {
    this.shirtService.saveFilterShirts = tag;
    //window.location.href = "/shop";
    this.router.navigateByUrl('/shop')
  }

  // Send Product to QuickView
  sendImageQuikcView(shirt: Shirt) {
    //console.log(shirt);
    this.shirtQuickView = shirt;
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
        },
        (error) => {
          console.log(error);
          // this.router.navigateByUrl('/cadastro');
          window.location.href = "/cadastro";
          alert("Necessário fazer o Login na Sua Conta");
        }
      );

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
