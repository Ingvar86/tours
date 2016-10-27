import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }   from './app.component';
import { ToursComponent } from './tours.component';

import {ToursService} from './tours.service';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule ],
    declarations: [ AppComponent, ToursComponent ],
    providers: [ ToursService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }