import { inject, Injectable, signal } from '@angular/core';
import { SessionStorageService } from './session-storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logoutTimer?: number;
  router = inject(Router);
  authExpired = signal(false);
  constructor(private SessionStorage: SessionStorageService){}
  isLoggedIn(): boolean {
    const token = this.SessionStorage.getAuthToken();
    const expiry = this.SessionStorage.getExpiry();
  
    if (!token || !expiry) return false;
  
    return Date.now() < +expiry;
  }
  
  
  login(username: string, password: string){
    this.SessionStorage.setAuthToken('e2dksd8adhyuiouqkk893rhjk');
    this.SessionStorage.setExpiry(new Date().getTime() + 300000);
    this.startAutoLogout();
  }
  logout(): void {
    this.SessionStorage.removeAuthToken();
    this.SessionStorage.removeExpiry();
  
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = undefined;
    }
    this.router.navigate(['/login']);
  }
  
  startAutoLogout(): void {
    const expiry = this.SessionStorage.getExpiry();
    const remainingTime = expiry - Date.now();
  
    if (remainingTime <= 0) {
      this.logout();
      return;
    }
  
    this.logoutTimer = window.setTimeout(() => {
      this.logout();
      this.authExpired.set(true);
    }, remainingTime);
  }
  
}
