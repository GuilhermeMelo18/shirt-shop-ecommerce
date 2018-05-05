import { Component } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  
  constructor(){


  }
  

  ngOnInit() {
    $(".new").click(function(){
      alert("Clicado");
    });

  }

}


