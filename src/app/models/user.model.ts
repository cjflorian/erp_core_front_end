export class User {
    Id: number;
    Name: string;
    Email: string;
    Password: string;
    Active: boolean;
    RoleId: number;

    constructor(id:number, name:string, email:string, password:string, active:boolean, roleId:number){
        this.Id=id;
        this.Name=name;
        this.Email=email;
        this.Password=password;
        this.Active=active;
        this.RoleId=roleId;
    }
}
