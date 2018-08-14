import { Component, OnInit } from '@angular/core';
import { User } from '../../entidades/user';
import { UsuarioService } from '../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginOptions, LoginResponse, AuthResponse, FacebookService, InitParams } from 'ngx-facebook';
import { Router } from '@angular/router';

declare var $: any;

function _window():any {
  return window;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  userSignIn: User;
  userSignUp: User;
  formLogin : FormGroup;
  formSignUp : FormGroup;
  formBuilderLogin: FormBuilder ;
  FormBuilderSignUp: FormBuilder;
  fbConnect : FacebookService;
  errorLogin: boolean;
  errorSignUp: boolean;

  constructor(private userService: UsuarioService, private fb: FacebookService, private router:Router) { 
    this.userSignIn = new User();
    this.userSignUp = new User();
    this.formBuilderLogin = new FormBuilder();
    this.FormBuilderSignUp = new FormBuilder();
    this.errorLogin = false;
    this.errorSignUp = false;
   
    //Configura Conecção com a APK Facebook
    let initParams: InitParams = {
      appId      : '316015435599113',
      xfbml      : true,
      version    : 'v3.0'
    };

    // Inicia o serviço Facebook
    fb.init(initParams);
    this.fbConnect = fb;

    // Inicializa a configuração das rotas
   
  }

  ngOnInit() {

    this.formLogin = this.formBuilderLogin.group(
      {
        email: [null, [Validators.required,  Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]]
      });

    this.formSignUp = this.FormBuilderSignUp.group(
      {
        name: [null, [Validators.required, Validators.minLength(6)]],
        email: [null, [Validators.required,  Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]]
      });

    
  }   
  
  //Login User 
  signInUser(){

    if(this.formLogin.valid){

      this.userService.loginUser(this.userSignIn)
      .subscribe(
        (data)=>{
  
          console.log(data);
          
          this.userService.userSave = data;
          this.errorLogin=false;
          //this.router.navigateByUrl('/shop');
          window.location.href = "/shop";
          
        },
        (error)=>{
            this.errorLogin=true;
            console.log(error);

        }
      );

    }else{};

  }

  // Login Facebook
  sigInFaceBook(){

    this.fbConnect.login({
      scope: 'email , public_profile'
    }).then((userData: any) => {
        this.fb.api('me?fields=email,name,picture', 'get', {
          perms: ['CREATE_CONTENT'] // get pages that the user can post to
        }).then(
          (res: any) => {
            console.log(res);
          },
          (err: any) => console.error(err)
        );
      },
      (err: any) => {
        console.error("Error logging in with Facebook: " + err);
      });
  }

  // SignUp User 
  signUpUser(){

    if(this.formSignUp.valid){

      this.userService.signUpUser(this.userSignUp)    
      .subscribe(
        (data)=>{
          console.log(data);
          this.errorSignUp = false;
         // this.router.navigateByUrl('/shop');
         window.location.href = "/shop";
        },
        (error)=>{
  
          console.log(error);
          this.errorSignUp = true;
        }
      );

    }else{

    };
  }

  // Hide Message Error Login
  hideMessageLogin(event: any) { 
      this.errorLogin = false;
  }
  // Hide Message Error SignUp
  hideMessageSignUp(event:any){
    this.errorSignUp = false;
  }

}
