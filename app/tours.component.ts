import { Component } from '@angular/core';
import { ToursService } from './tours.service';
import { Tour } from './tour';

@Component({
    selector: 'tours',
    templateUrl: 'tours.component.html'
})
export class ToursComponent { 
    private dateFrom: string;
    private dateTo: string;
    private nigths: number = 7;
    private page: number = 1;
    private tours: Tour[];

    constructor(private toursService: ToursService) {}

    onSearchClick(): void {
        this.toursService.getTours(this.dateFrom, this.dateTo, this.nigths, this.page)
            .then(response => this.tours = response);
    } 
}