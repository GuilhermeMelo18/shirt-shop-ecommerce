export class UtilShirt{

    //Model Shirt
    MODEL_MAN = "MAN";
    MODEL_GIRL = "GIRL";
    IMG_MODEL_GIRL = "assets/img/amostra-shirt/white-shirt-girl.png";
    IMG_MODEL_MAN = "assets/img/amostra-shirt/white-shirt-man.png";

    //IMAGES COLOR SHIRT
    COLOR_BLACK = "BLACK";
    COLOR_RED = "RED";
    COLOR_BLUE = "BLUE";
    COLOR_GREY = "GREY";
    COLOR_ORANGE = "ORANGE";
    COLOR_WHITE = "WHITE";

    COLOR_MAP_GIRL = new Map<string,string>([
      [ this.COLOR_BLACK, "assets/img/amostra-shirt/black-shirt-girl.png" ],
      [ this.COLOR_RED, "assets/img/amostra-shirt/red-shirt-girl.png" ],
      [ this.COLOR_BLUE, "assets/img/amostra-shirt/blue-shirt-girl.png" ],
      [ this.COLOR_GREY, "assets/img/amostra-shirt/grey-shirt-girl.png" ],
      [ this.COLOR_ORANGE, "assets/img/amostra-shirt/orange-shirt-girl.png" ],
      [ this.COLOR_WHITE, "assets/img/amostra-shirt/white-shirt-girl.png" ],
    ]);
    
    COLOR_MAP_MAN = new Map<string,string>([
      [ this.COLOR_BLACK, "assets/img/amostra-shirt/black-shirt-man.png" ],
      [ this.COLOR_RED, "assets/img/amostra-shirt/red-shirt-man.png" ],
      [ this.COLOR_BLUE, "assets/img/amostra-shirt/blue-shirt-man.png" ],
      [ this.COLOR_GREY, "assets/img/amostra-shirt/grey-shirt-man.png" ],
      [ this.COLOR_ORANGE, "assets/img/amostra-shirt/orange-shirt-man.png" ],
      [ this.COLOR_WHITE, "assets/img/amostra-shirt/white-shirt-man.png" ],
    ]);
    

    //Options Tags Shirts
    optionsTags = [
          {name:'Geek', value:'#f0f8ff', checked:false},
          {name:'Esporte', value:'#92b0b3', checked:false},
          {name:'Cultura-Pop', value:'#f0f8ff', checked:false},
          {name:'Pets', value:'#92b0b3', checked:false},
          {name:'Artística', value:'#f0f8ff', checked:false},
          {name:'Frases', value:'#92b0b3', checked:false},
          {name:'Abstrato', value:'#f0f8ff', checked:false}
      ];

}