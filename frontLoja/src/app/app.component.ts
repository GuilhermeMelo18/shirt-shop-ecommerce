import { Component } from '@angular/core';
import { UsuarioService } from './services/user.service';
import { User } from './entidades/user';
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // User Show
  user: User;
  userSignIn: User;
  userDefault: User;

  constructor(private userService: UsuarioService) {

    // User Default Config
    this.userDefault = new User();
    this.userSignIn = new User();
    this.userDefault.imageUser = "../../../assets/img/core-img/logo.png";
    this.userDefault.imageSite = "../../../assets/img/core-img/wall-paper.jpg";
    this.userDefault.nameUser = "Faça o seu Login";
    this.userSignIn.imageUser = this.userDefault.imageUser;
    this.userSignIn.nameUser = this.userDefault.nameUser;
  }

  ngOnInit() {

    //Verify User Login
    this.userService.getUserSession()
      .subscribe(
        (data) => {
          this.userSignIn = data[0];

          if (this.userSignIn.imageUser == undefined) {
            this.userSignIn.imageUser = this.userDefault.imageUser;
          }
        },
        (error) => {
          this.userSignIn.imageUser = this.userDefault.imageUser;
          this.userSignIn.nameUser = this.userDefault.nameUser;
          
        }
      );
    // End Verify User Login
  }

  // Logout User  
  logOutUser() {

    this.userService.logOutUser()
      .subscribe(
        (data) => {
          console.log(data);
          window.location.href = "/";
        },
        (error) => {
          console.log(error);
        }
      );

  }

  // Go to Shop Client
  goToShopClient() {

    console.log(this.userSignIn);

    if (this.userSignIn._id != undefined) {

      this.userService.getUserById(this.userSignIn._id)
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

}


