import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {  HttpHeaders} from '@angular/common/http';

export const UrlApi = () => { return 'https://4k6aonzaxafaoebwd2x6mw6icq0syahn.lambda-url.us-east-1.on.aws/api/'}

export const IsLoged = (): boolean =>{
    let isLogin = false;
    let session: any  = localStorage.getItem('user');
    if(session!==null)
      {
        let user = JSON.parse(session);
        let due_date_token = user["due_date_token"];
        let currentDate = new Date();
        const formattedDate = currentDate.toLocaleString("en-US");
        if(due_date_token!==null && due_date_token.toLocaleString("en-US")<=formattedDate) {
          isLogin = true; 
          return isLogin;
        }
        else
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
    window.location.href = '/login';
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


export const SwalertConfirmDelete = () => {
  return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          return result.isConfirmed;
      }else{  
        return result.isConfirmed;
      }
    })
}


export const SwalertOkDialog = (message = '') => {
 Swal.fire({
      title: "Success",
      text: message,
      icon: "success",
      confirmButtonText: "OK",
      showConfirmButton: false,
      timer: 3000
      });
  }
