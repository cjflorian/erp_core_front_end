import { Roles } from "./roles.model";

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    active: number;
    //roleId: number;
    role: Roles | undefined;

    constructor(id:number, name:string, email:string, password:string,  active:number, role:Roles){
        this.id=id;
        this.name=name;
        this.email=email;   
        this.password=password;
        this.active=active;
        this.role=role;
    }
}
