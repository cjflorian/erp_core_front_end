export class UserRoles {
    id: number;
    name: string;
    email: string;
    password: string;
    active: number;
    datecreated: string;
    roleId: number;
    roleName: string;
    module: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.active = data.active;
        this.datecreated = data.datecreated;
        this.roleId = data.roleId;
        this.roleName = data.roleName;
        this.module = data.module;
    }
}