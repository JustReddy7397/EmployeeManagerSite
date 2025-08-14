import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DarkModeService } from './service/darkmode.service';
import { EmployeeService } from './service/employee.service';
import { ZardAvatarComponent } from '@shared/components/avatar/avatar.component';
import { ZardDropdownMenuItemComponent } from '@shared/components/dropdown/dropdown-item.component';
import { ZardDropdownMenuComponent } from '@shared/components/dropdown/dropdown.component';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { AuthService } from './service/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <nav class="bg-cyan-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center h-12">
          <div class="flex-1">
            <a routerLink="/" class="nav-brand text-lg">
              Crewcue
            </a>
          </div>
          <div class="flex items-center space-x-6">
            <a routerLink="/"
               routerLinkActive="nav-link-active"
               [routerLinkActiveOptions]="{exact: true}"
               class="nav-link">
              Home
            </a>
          </div>
          <div class="flex-1 flex justify-end">
            @if (!(authService.isAuthenticated$ | async)) {
              <button (click)="navigateToLogin()" z-button>Login</button>
            } @else {
              <z-dropdown-menu class="avatar-dropdown">
                <div dropdown-trigger>
                  <z-avatar [zImage]="employeePicture" zSize="sm" zShape="circle"/>
                </div>

                <z-dropdown-menu-item (click)="onProfileClick()">
                  Profile
                </z-dropdown-menu-item>

                <z-dropdown-menu-item (click)="onSettingsClick()">
                  Settings
                </z-dropdown-menu-item>

                <z-dropdown-menu-item variant="destructive" (click)="onLogout()">
                  Logout
                </z-dropdown-menu-item>
              </z-dropdown-menu>
            }
          </div>
        </div>
      </div>
    </nav>

    <main class="container mx-auto px-4 py-8">
      <router-outlet />
    </main>
  `,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ZardAvatarComponent,
    ZardDropdownMenuComponent, ZardDropdownMenuItemComponent, ZardButtonComponent, AsyncPipe]
})
export class App implements OnInit {

  readonly profilePictureDefault = {
    fallback: "JR",
    url: "https://f4.bcbits.com/img/a3412638345_16.jpg",
  }

  readonly employeePicture = {
    fallback: "JR",
    url: "https://cdn.discordapp.com/avatars/729270256777953312/b3f2def439bb3072a2ecdd8cb707f9c8.png?size=1024",
  }

  constructor(
    private darkModeService: DarkModeService,
    protected employeeService: EmployeeService,
    protected authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.darkModeService.initTheme();
  }

  protected async onProfileClick() {
    await this.router.navigate(["/employee"])
  }

  protected onSettingsClick() {
    console.log('Settings clicked');
  }

  protected onLogout() {
    this.authService.logout().subscribe({
      next: async () => {
        await this.router.navigateByUrl("/");
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }

  protected navigateToLogin() {
    this.router.navigate(['/login']).catch(err => console.error('Navigation error:', err));
  }
}
