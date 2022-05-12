import {User} from "./user.model";
import {Files} from "../files";
import {Adver} from "./adver";

export class Collaborator {
    idCollaborator?: any;
    name?: string;
    email?: string='';
    address?: string='';
    typeCollaborator?:string='';
    user?: User;
    ads?: Adver;
    fileDB?:Files;





}
