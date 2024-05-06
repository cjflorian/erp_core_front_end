
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

    constructor( Name_val: string,  Password_val: string,  Iduser_val: number,  Email_val: string, Role_id_val: number, Role_name_val: string,  Message: string, Token: string,  Due_date_token: Date){
        this.Name_val = Name_val;
        this.Password_val = Password_val;
        this.Iduser_val = Iduser_val;
        this.Email_val = Email_val;
        this.Role_id_val = Role_id_val;
        this.Role_name_val = Role_name_val;
        this.Message = Message;
        this.Token = Token;
        this.Due_date_token = Due_date_token;
    }
}