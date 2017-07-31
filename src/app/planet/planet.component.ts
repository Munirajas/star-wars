import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { PlanetService } from './planet.service';
import { AuthService } from '../auth/auth.service';

@Component({
    templateUrl: 'planet.component.html',
    providers: [
        PlanetService,
        AuthService
    ]
})

export class PlanetComponent implements OnInit {
	model: any = [];
    loading = false;

    constructor(
    	private route: ActivatedRoute,
        private router: Router,
        private planetService: PlanetService,
        private authService: AuthService
    ) {
        this.model.maxPopulation = 1000000000000;
        this.model.maxFontSize = 30;
    }

    ngOnInit() {
    	if (localStorage.getItem('currentUser')) {
    		this.model.username = JSON.parse(localStorage.getItem('currentUser')).name;
    	}

        // Load all the planets
        this.search('');
    }

    search(searchTerm: string) {
        this.loading = true;

        if (localStorage.getItem('planets')) {
            this.model.planets = this.planetService.getMatchingPlanets(searchTerm);
            this.loading = false;
        } else {
            this.planetService.search(searchTerm)
                .subscribe(
                    data => {
                        this.model.planets = data;
                        this.loading = false;
                    },
                    error => {
                        alert('Something went wrong while searching planets.');
                        this.loading = false;
                    }
                );
        }
    }

    logout() {
    	this.authService.logout();
    	this.router.navigate(['']);
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