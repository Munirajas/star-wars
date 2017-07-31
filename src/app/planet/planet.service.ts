import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlanetService {
    constructor(private http: Http) { }

    search(searchTerm : string) {
        return this.http.get('https://swapi.co/api/planets')
            .map((response: Response) => {
                const data = response.json();
                
                localStorage.setItem('planets', JSON.stringify(data.results));

                return this.getMatchingPlanets(searchTerm);
            })
            .catch(this.handleError);
    }

    getMatchingPlanets (searchTerm : string) {
        searchTerm = searchTerm.toLowerCase();
        let data: any = [];
        let planets = JSON.parse(localStorage.getItem('planets'));

        for (let index = 0; index < planets.length; index++) {
            if (planets[index].name.toLowerCase().includes(searchTerm)) {
                data.push(planets[index]);
            }
        }

        return data;
    }

    handleError (error: any) {
        let errorMsg = 'Something went wrong while fetching the articles.';
        
        return Observable.throw(errorMsg);
    }
}