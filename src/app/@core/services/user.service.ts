import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
     http = inject(HttpClient);
    fetchAllUsers(){
        return this.http.get<{ users: User[]}>('https://dummyjson.com/users');
    }
}