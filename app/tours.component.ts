import { Component } from '@angular/core';
import { ToursService } from './tours.service';
import { Tour } from './tour';
import { SearchParams } from './searchParams'; 

@Component({
    selector: 'tours',
    templateUrl: 'tours.component.html'
})
export class ToursComponent { 
    private dateFrom: string;
    private dateTo: string;
    private hotel: string;
    private room: string;
    private nights: number = 7;
    private page: number = 1;
    private tours: Tour[];

    constructor(private toursService: ToursService) {}

    onSearchClick(): void {
        let param = new SearchParams();
        param.dateFrom = this.dateFrom;
        param.dateTo = this.dateTo;
        param.hotel = this.hotel;
        param.room = this.room;
        param.nights = this.nights;
        param.page = this.page;
        this.toursService.getTours(param)
            .then(response => this.tours = response);
    } 
}