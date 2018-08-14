export class Shirt{
    
    _id : string;
    clientId: string;
    titleShirt: string;
    modelShirt: string;
    colorShirt: string;
    imgShirt: string;
    imgPicture: string;
    shirtPriceSell: string;
    shirtGainClient : string;
    arrayTags: Array<string>;
    qtdLikes: string;

    constructor(){
        this.arrayTags = new Array();
    }

}