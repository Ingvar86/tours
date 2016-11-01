import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { ChartsModule }  from 'ng2-charts/ng2-charts';

import { AppComponent }   from './app.component';
import { ToursComponent } from './tours.component';
import { BarChartComponent } from './chart.component';

import {ToursService} from './tours.service';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, ChartsModule ],
    declarations: [ AppComponent, ToursComponent, BarChartComponent ],
    providers: [ ToursService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }