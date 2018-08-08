import { Shirt } from "./shirt";

export class User{
    _id : string;
    email: string;
    password: string;
    nameUser: string;
    imageUser: string;
    imageSite: string;
    description: string;
    city: string;
    country: string;
    listBag : Array<string>;
    cep: string;
    totalGain: string;
    totalByMoth : [string];
    totalviewsPage : string;
    totalLikesPage: String;

    constructor(){
        this.listBag = new Array();
    }
}