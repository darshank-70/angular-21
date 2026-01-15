import { Injectable } from '@angular/core';
import { SessionStorageConstants } from '../constants/session-storage.constants';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  setAuthToken(token: string){
    sessionStorage.setItem(SessionStorageConstants.AUTH_TOKEN, token);
  }
  removeAuthToken(){
    if(sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN)){
      sessionStorage.removeItem(SessionStorageConstants.AUTH_TOKEN);
    }
  }
  getAuthToken(){
    return sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN);
  }
  setExpiry(expiry: number){
    sessionStorage.setItem(SessionStorageConstants.EXPIRE_IN, expiry.toString());
  }
  getExpiry(): number{
    if(sessionStorage.getItem(SessionStorageConstants.EXPIRE_IN)){
      
      return Number(sessionStorage.getItem(SessionStorageConstants.EXPIRE_IN));
    } return 0;
  }
  removeExpiry(){
      sessionStorage.removeItem(SessionStorageConstants.EXPIRE_IN);
  }
}
