export class Shirt{

    clientId: string;
    titleShirt: string;
    modelShirt: string;
    colorShirt: string;
    imgShirt: string;
    imgPicture: string;
    shirtPriceSell: string;
    shirtGainClient : string;
    arrayTags: Array<string>;

    constructor(){
        this.arrayTags = new Array();
        this.clientId = "1";
    }

}