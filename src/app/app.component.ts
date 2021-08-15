import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'meeting';

  constructor(private router: Router) {}

  get showMenu() {
    return (
      this.router.url.includes('client') || this.router.url.includes('admin')
    );
  }

  asAdmin() {
    this.router.navigate(['admin']);
    console.log(this.router);
  }
  asClient() {
    this.router.navigate(['client']);
  }

  back() {
    this.router.navigate(['/']);
  }
}
