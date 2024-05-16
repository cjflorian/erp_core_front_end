import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {  HttpHeaders} from '@angular/common/http';

export const UrlApi = () => { return 'https://4k6aonzaxafaoebwd2x6mw6icq0syahn.lambda-url.us-east-1.on.aws/api/'}

export const IsLoged = (): boolean =>{
    let isLogin = false;
    let session: any  = localStorage.getItem('user');
    
    console.log(session);
    
      if(session!==null)
      {
        let user = JSON.parse(session);
        isLogin = true; 
        return isLogin;
      }
      else
      {
        isLogin = false; 
        return isLogin;
      }    
}
export const Logout = () => {
    localStorage.clear();
    // Add any additional logout logic here
    Swal.hideLoading();
    Swal.fire('Logout','Bye thanks for comming', 'success');
}

export const getSession = () => {
    let session: any  = localStorage.getItem('user');
    console.log(session);
    let user = JSON.parse(session);
    let email = user["email_val"];
    return email;
}


export const setSession = (res: any)  => {
    if(res.token) {
        localStorage.setItem('user', JSON.stringify({iduser_val: res.iduser_val, token: res.token, email_val: res.email_val, role_id_val: res.role_id_val, role_name_val:res.role_name_val, due_date_token: res.due_date_token}));
        return true;
    }
    return false;
}

export const getToken = (): string => {
  const session: any = localStorage.getItem('user');
  const user = JSON.parse(session);
  const token = user?.token || '';
  return `${token}`;
};



export const createHttpHeader = (): HttpHeaders => {
  const token = getToken();

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return headers;
};

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':  `Bearer ${getToken()}`
  })
}
