import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Tour } from './tour';
import { SearchParams } from './searchParams'; 

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ToursService {
    private toursUrl = 'api/tours'
    constructor(private http: Http) { }

    getTours(param: SearchParams) : Promise<Tour[]> {
        let params = new URLSearchParams();
        params.set('dateFrom', param.dateFrom);
        params.set('dateTo', param.dateTo);
        params.set('hotel', param.hotel);
        params.set('room', param.room);
        params.set('nights', param.nights.toString());
        params.set('page', param.page.toString());
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