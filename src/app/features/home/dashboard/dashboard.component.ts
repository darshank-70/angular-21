import { ChangeDetectionStrategy, Component, inject, Inject, signal } from '@angular/core';
import { AuthService } from '../../../@core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/services/user.service';
import { map, tap } from 'rxjs';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: `./dashboard.component.html`,
  standalone: true,
  imports: [],
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
 authService = inject(AuthService);
 router = inject(Router);
 userService = inject(UserService);
 usersList = signal<User[]>([]);
 isLoading = signal<boolean>(false);
 fetchAllUsers() {
  this.isLoading.set(true);
  this.userService.fetchAllUsers().pipe(
    map((res) => res.users),
    tap((res)=> this.isLoading.set(false))
).subscribe((res: User[])=> this.usersList.set(res));
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
