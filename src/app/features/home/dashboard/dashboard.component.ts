import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { AuthService } from '../../../@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: `./dashboard.component.html`,
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
 authService = inject(AuthService);
 router = inject(Router);
  logout(){
    this.authService.logout();
    this.router.navigate(['/login'],{
      queryParams: {
        type: 'logout',
      }
    })
  }
}
