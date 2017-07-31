import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';

import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: 'home.component.html',
    providers: [
        AuthService
    ]
})
export class HomeComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl = 'planet';
    invalidLogin = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) { 
        if (localStorage.getItem('currentUser')) {
            this.router.navigate(['planet']);
        }
    }

    ngOnInit() {
        this.observeRouteChange();
    }

    login() {
        this.loading = true;
        this.authService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    if (data) {
                        this.invalidLogin = false;
                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.invalidLogin = true;
                        this.loading = false;
                    }
                },
                error => {
                    alert(error);
                    this.invalidLogin = false;
                    this.loading = false;
                });
    }

    observeRouteChange () {
        this.router.events.subscribe((event: any): void => {
            this.navigationInterceptor(event);
        });
    }

    navigationInterceptor(event): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
    }


}