import { Component, OnInit } from '@angular/core';
import { User } from '../../entidades/user';
import { UsuarioService } from '../../services/user.service';
import { error } from 'util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;

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

  constructor(private userService: UsuarioService) { 
    this.userSignIn = new User();
    this.userSignUp = new User();
    this.formBuilderLogin = new FormBuilder();
    this.FormBuilderSignUp = new FormBuilder();
    
  }

  ngOnInit() {

    this.formLogin = this.formBuilderLogin.group(
      {
        email: [null, [Validators.required,  Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]]
      });

    this.formSignUp = this.FormBuilderSignUp.group(
      {
        name: [null, [Validators.required]],
        email: [null, [Validators.required,  Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]]
      });
  }   


  signInUser(){

    if(this.formLogin.valid){

      this.userService.loginUser(this.userSignIn)
      .subscribe(
        (data)=>{
  
          console.log(data);
        },
        (error)=>{
  
        }
      );

    }else{};

  }

  sigInFaceBook(){
    
  }

  signUpUser(){

  
    if(this.formSignUp.valid){

      this.userService.signUpUser(this.userSignUp)    
      .subscribe(
        (data)=>{
          console.log(data);
        },
        (error)=>{
  
          console.log(error);
        }
      );

    }else{

    };

  
  }

}
