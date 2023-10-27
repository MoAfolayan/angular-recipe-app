import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule]
})
export class LoginComponent implements OnInit {

    constructor(public auth: AuthService, public router: Router) { }

    ngOnInit(): void {
    }

    login(): void {
        this.auth.loginWithPopup()
            .pipe(
            // tap(console.log)
        )
            .subscribe(
                () => {
                    console.log('success logging in');
                    this.router.navigate(['home']);
                },
                err => console.error(`Error: ${err}`),
                () => console.log('Observer got a complete notification')
            )
    }
}
