export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    datecreated: Date;
    active: boolean;
    roleId: number;

    constructor(id:number, name:string, email:string, password:string, datecreated:Date, active:boolean, roleId:number){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
        this.datecreated=datecreated=datecreated;
        this.active=active;
        this.roleId=roleId;
    }
}
