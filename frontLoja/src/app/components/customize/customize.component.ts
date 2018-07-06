import { Component, OnInit } from '@angular/core';
import * as interact from 'interactjs';
import { Shirt } from '../../entidades/shirt';
import { UtilShirt } from '../../entidades/utilShirt';
import { UsuarioService } from '../../services/user.service';
import * as html2canvas from "html2canvas";

declare var $: any;

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {

  //Shirt Variables
  messageCampos: string;
  shirtModelImage: string;
  currentModel: string;
  shirtClass: Shirt;
  utilShirt: UtilShirt;

  constructor(private clientServise: UsuarioService) {

    this.shirtClass = new Shirt();
    this.utilShirt = new UtilShirt();

    this.shirtClass.shirtPriceSell = (parseFloat("49.90")).toFixed(2);
    this.shirtClass.shirtGainClient = (parseFloat(this.shirtClass.shirtPriceSell) *(0.2)).toFixed(2);
    this.shirtModelImage = this.utilShirt.IMG_MODEL_MAN;
    this.shirtClass.colorShirt = this.utilShirt.COLOR_WHITE;


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
        slide: function( event, ui ) {
          _content.shirtClass.shirtPriceSell = ui.value;
          _content.shirtClass.shirtGainClient = (parseFloat(_content.shirtClass.shirtPriceSell) *(0.2)).toFixed(2);
        }
       });
       
       //Set Shirt Color
       this.changeShirt(this.utilShirt.MODEL_MAN, this.utilShirt.COLOR_WHITE);

       
  }

  changeShirt(model:string,color:string){

    var sc = this.utilShirt;
    var colorShirt = "";
    
    if(model== sc.MODEL_GIRL){
      this.currentModel = sc.MODEL_GIRL;
    }else if(model==  sc.MODEL_MAN){
      this.currentModel = sc.MODEL_MAN;
    }

    if(this.currentModel == sc.MODEL_GIRL){
      
      if(color == sc.COLOR_BLACK){
        this.shirtModelImage = sc.COLOR_MAP_GIRL.get(sc.COLOR_BLACK);
        colorShirt = sc.COLOR_BLACK;    
      }else if(color == sc.COLOR_RED){
        this.shirtModelImage =  sc.COLOR_MAP_GIRL.get(sc.COLOR_RED);  
        colorShirt = sc.COLOR_RED;      
      }else if(color == sc.COLOR_BLUE){
        this.shirtModelImage = sc.COLOR_MAP_GIRL.get(sc.COLOR_BLUE);  
        colorShirt = sc.COLOR_BLUE;     
      }else if(color == sc.COLOR_GREY){
        this.shirtModelImage = sc.COLOR_MAP_GIRL.get(sc.COLOR_GREY);  
        colorShirt = sc.COLOR_GREY;     
      }else if(color == sc.COLOR_ORANGE){
        this.shirtModelImage = sc.COLOR_MAP_GIRL.get(sc.COLOR_ORANGE);   
        colorShirt = sc.COLOR_ORANGE;     
      }else{
        this.shirtModelImage =  sc.COLOR_MAP_GIRL.get(sc.COLOR_WHITE);
        colorShirt = sc.COLOR_WHITE;       
      }   

      this.shirtClass.modelShirt = sc.MODEL_GIRL;
      this.shirtClass.colorShirt = colorShirt;

    } else if(this.currentModel == sc.MODEL_MAN){
      
      if(color == sc.COLOR_BLACK){
        this.shirtModelImage = sc.COLOR_MAP_MAN.get(sc.COLOR_BLACK);
        colorShirt = sc.COLOR_BLACK;
      }else if(color == sc.COLOR_RED){
        this.shirtModelImage =  sc.COLOR_MAP_MAN.get(sc.COLOR_RED);
        colorShirt = sc.COLOR_RED;        
      }else if(color == sc.COLOR_BLUE){
        this.shirtModelImage = sc.COLOR_MAP_MAN.get(sc.COLOR_BLUE);  
        colorShirt = sc.COLOR_BLUE;     
      }else if(color == sc.COLOR_GREY){
        this.shirtModelImage = sc.COLOR_MAP_MAN.get(sc.COLOR_GREY);   
        colorShirt = sc.COLOR_GREY;    
      }else if(color == sc.COLOR_ORANGE){
        this.shirtModelImage = sc.COLOR_MAP_MAN.get(sc.COLOR_ORANGE);  
        colorShirt = sc.COLOR_ORANGE;      
      }else{
        this.shirtModelImage =  sc.COLOR_MAP_MAN.get(sc.COLOR_WHITE); 
        colorShirt = sc.COLOR_WHITE;
      } 
      
      this.shirtClass.modelShirt = sc.MODEL_MAN;
      this.shirtClass.modelShirt = colorShirt;
    }
  }

  readImage(event) {

      let url = new Image();
      let reader = new FileReader();
      let file = event.target.files[0];
      let imageType = /image.*/;

      if(file.type.match(imageType)){
          
        reader.onload = (event:any) => {
          let src = event.target.result;
          $(".image-container").attr("src", src);
          this.shirtClass.imgPicture = src;
        }

        reader.readAsDataURL(file);
      }
  }

  // Call Service and Save the Customize Shirt
  salveShirt(){

    let _content = this;

    html2canvas(document.getElementById("wrapper-image"),{logging:false, async: false}).then(function(canvas) {
       _content.shirtClass.imgShirt = canvas.toDataURL();
    });

    this.utilShirt.optionsTags.forEach(element => {
        if(element.checked==true){
          this.shirtClass.arrayTags.push(element.tag);
        }
    });
    
    if(this.shirtClass.imgShirt!=undefined &&
        this.shirtClass.clientId!=undefined&&
        this.shirtClass.colorShirt!=undefined&&
        this.shirtClass.imgPicture!=undefined&&
        this.shirtClass.modelShirt!=undefined&&
        this.shirtClass.titleShirt!=undefined &&
        this.shirtClass.arrayTags.length > 0 ){

       console.log(this.shirtClass);
    }else{

      if(this.shirtClass.imgPicture==undefined){
        this.messageCampos = "Envie sua Estampa";
      }else if(this.shirtClass.titleShirt==undefined){
        this.messageCampos = "Escreva um título para sua Camisa";
      }else if(this.shirtClass.arrayTags.length==0){
        this.messageCampos = "Selecione ao Menos uma Categoria";
      }
    }    


  }
  
}