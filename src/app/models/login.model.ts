
export class Login {
    Name_val: string;
    Password_val: string;
    Iduser_val: number;
    Email_val: string;
    Role_id_val: number;
    Role_name_val: string;
    Message: string;
    Token: string;
    Due_date_token: Date;

    constructor( name_val: string,  password_val: string,  iduser_val: number,  email_val: string, role_id_val: number, role_name_val: string,  message: string, token: string,  due_date_token: Date){
        this.Name_val = name_val;
        this.Password_val = password_val;
        this.Iduser_val = iduser_val;
        this.Email_val = email_val;
        this.Role_id_val = role_id_val;
        this.Role_name_val = role_name_val;
        this.Message = message;
        this.Token = token;
        this.Due_date_token = due_date_token;
    }
}