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
  user : User;
  
  constructor(private userService: UsuarioService){
     this.user = new User();
     this.user.nameUser = "Guilherme Melo";
     this.user.imageUser = "../assets/img/core-img/logo.png";
  }

  ngOnInit() {

    //Verify User Login
    this.userService.getUserSession()
    .subscribe(
      (data)=>{
        if(data.nameUser!="" && this.user.imageUser!="" ){
          this.user.nameUser = data.nameUser;
          this.user.imageUser = data.imageUser;
        }
   
      },
      (error)=>{

      }
    );
    // End Verify User Login
  }

}


