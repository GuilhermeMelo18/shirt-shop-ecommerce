import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import * as interact from 'interactjs';
import { Shirt } from '../entidades/shirt';
import { UtilShirt } from '../entidades/utilShirt';

declare var $: any;

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {

  //Shirt Variables
  shirtModelImage: string;
  currentModel: string;
  shirtClass: Shirt;
  utilShirt: UtilShirt;

  constructor() {
    
    this.shirtClass = new Shirt();
    this.utilShirt = new UtilShirt();

    this.shirtClass.shirtPriceSell = (parseFloat("49.90")).toFixed(2);
    this.shirtClass.shirtGainClient = (parseFloat(this.shirtClass.shirtPriceSell) *(0.2)).toFixed(2);
    this.shirtModelImage = this.utilShirt.IMG_MODEL_MAN;


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

    if(model== sc.MODEL_GIRL){
      this.currentModel = sc.MODEL_GIRL;
    }else if(model==  sc.MODEL_MAN){
      this.currentModel = sc.MODEL_MAN;
    }

    if(this.currentModel == sc.MODEL_GIRL){
      
      if(color == sc.COLOR_BLACK){
        this.shirtModelImage = sc.COLOR_MAP_GIRL.get(sc.COLOR_BLACK);
      }else if(color == sc.COLOR_RED){
        this.shirtModelImage =  sc.COLOR_MAP_GIRL.get(sc.COLOR_RED);        
      }else if(color == sc.COLOR_BLUE){
        this.shirtModelImage = sc.COLOR_MAP_GIRL.get(sc.COLOR_BLUE);       
      }else if(color == sc.COLOR_GREY){
        this.shirtModelImage = sc.COLOR_MAP_GIRL.get(sc.COLOR_GREY);       
      }else if(color == sc.COLOR_ORANGE){
        this.shirtModelImage = sc.COLOR_MAP_GIRL.get(sc.COLOR_ORANGE);        
      }else{
        this.shirtModelImage =  sc.COLOR_MAP_GIRL.get(sc.COLOR_WHITE); ;        
      }   

    } else if(this.currentModel == sc.MODEL_MAN){
      
      if(color == sc.COLOR_BLACK){
        this.shirtModelImage = sc.COLOR_MAP_MAN.get(sc.COLOR_BLACK);
      }else if(color == sc.COLOR_RED){
        this.shirtModelImage =  sc.COLOR_MAP_MAN.get(sc.COLOR_RED);        
      }else if(color == sc.COLOR_BLUE){
        this.shirtModelImage = sc.COLOR_MAP_MAN.get(sc.COLOR_BLUE);       
      }else if(color == sc.COLOR_GREY){
        this.shirtModelImage = sc.COLOR_MAP_MAN.get(sc.COLOR_GREY);       
      }else if(color == sc.COLOR_ORANGE){
        this.shirtModelImage = sc.COLOR_MAP_MAN.get(sc.COLOR_ORANGE);        
      }else{
        this.shirtModelImage =  sc.COLOR_MAP_MAN.get(sc.COLOR_WHITE); ;        
      }  
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
        }
    
        reader.readAsDataURL(file);
      }
  }

  
}