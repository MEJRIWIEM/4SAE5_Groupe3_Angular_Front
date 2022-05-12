import {Collaborator} from "./collaborator";

export class Offer {

    idOffer?: any;
    name?: string='';
    ratingAvg?: any;
    countUser?: any;
    typeOffer?:string='';
    percent?:any;
    collaborator?: Collaborator;
}
