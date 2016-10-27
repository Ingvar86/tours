import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Tour } from './tour';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ToursService {
    private toursUrl = 'api/tours'
    constructor(private http: Http) { }

    getTours(dateFrom: string, dateTo: string, nights: number, page: number) : Promise<Tour[]> {
        let params = new URLSearchParams();
        params.set('dateFrom', dateFrom);
        params.set('dateTo', dateTo);
        params.set('nights', nights.toString());
        params.set('page', page.toString());
        return this.http.get(this.toursUrl, {search: params})
            .toPromise()
            .then(response => response.json() as Tour[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }   
}