import {User} from "./user.model";
import {Collaborator} from "./collaborator";
import {Files} from "../files";

export class Adver {
    idAd?: any;
    name?: string='';
    cost?: any;
    typeAd?: string='';
    targetNbrViews?:any;
    finalNbrViews?:any;
    dateCreated: number = Date.now();
    //dateCreated?: string='';
    // dateCreated?:Date;
    dateEnd?:string;
   // idCollaborator?:string='';
    collaborator?: Collaborator;
    fileDB?:Files;

}
