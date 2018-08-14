import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/user.service';
import { ShirtService } from '../../services/shirt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userSignIn : any;
  bagShirtUser : any;

  constructor(private userService : UsuarioService, private shirtService : ShirtService) { }

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

              },
              (error) => {

                console.log(error);
              }
            );

        },
        (error) => {

            
        }
      );
    // End Verify User Login
  }

}
