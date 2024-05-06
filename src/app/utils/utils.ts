import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export const UrlApi = () => { return 'https://4k6aonzaxafaoebwd2x6mw6icq0syahn.lambda-url.us-east-1.on.aws/api/'}

export const IsLoged = (userName : string): boolean =>{
    let isLogin = false;
    let session:any  = localStorage.getItem('user');
    console.log(session);
    
      if(session!==null)
      {
        let user = JSON.parse(session);
        userName = user["email"];
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
}