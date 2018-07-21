import { Shirt } from "./shirt";

export class User{

    email: string;
    password: string;
    nameUser: string;
    imageUser: string;
    imageSite: string;
    description: string;
    city: string;
    country: string;
    listBag : Array<string>;

    constructor(){
        this.listBag = new Array();
    }
}