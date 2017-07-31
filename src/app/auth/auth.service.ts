import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.get('https://swapi.co/api/people')
            .map((response: Response) => {
                const data = response.json();
                let user: any = '';

                if (data) {
                    for (let index = 0; index < data.results.length; index++) {
                        const n = data.results[index].name;
                        const d = data.results[index].birth_year;

                        if ((n === username) && (d === password)) {
                            user = data.results[index];
                            localStorage.setItem('currentUser', JSON.stringify(user));
                            break;
                        }
                    }
                }

                return user;
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('planets');
    }
}