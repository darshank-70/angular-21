import { ChangeDetectionStrategy, Component, inject, Inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../@core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/services/user.service';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs';
import { User } from '../../../models/user.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: `./dashboard.component.html`,
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
 authService = inject(AuthService);
 router = inject(Router);
 userService = inject(UserService);
 usersList = signal<User[]>([]);
 isLoading = signal<boolean>(false);
 searchControl: FormControl = new FormControl('');
 
  ngOnInit(): void {
    this.searchUsersListener();
  }

 fetchAllUsers() {
  this.isLoading.set(true);
  this.userService.fetchAllUsers().pipe(
    map((res) => res.users),
    tap((res)=> this.isLoading.set(false))
).subscribe((res: User[])=> this.usersList.set(res));
 }
 fetchUsersAgeAbove20(){

 }
searchUsersListener(){
  this.searchControl.valueChanges.pipe(switchMap((value: string) => this.userService.searchUsers(value) )).subscribe((res: {users: User[]}) => this.usersList.set(res.users));
}
  logout(){
    this.authService.logout();
    this.router.navigate(['/login'],{
      queryParams: {
        type: 'logout',
      }
    })
  }
}
