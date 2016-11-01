import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Tour } from './tour';
import 'chart.js';

@Component({
  selector: 'bar-chart',
  templateUrl: 'chart.component.html'
})

export class BarChartComponent implements OnChanges {
    @Input()
    public data: Tour[];

    private barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    };

    private barChartType:string = 'bar';
    private barChartLabels:string[];
    private barChartData:any[];
    //private barChartLabels:string[] = ['1', '2', '3', '4'];
    //private barChartData:any[] = [{data: [1, 2, 3, 4], label: 'Test'}];

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        if (this.data) {
            this.barChartLabels = [];
            this.barChartData = [];
            let chartData = this.data.slice(); 
            while(chartData && chartData.length > 0) {
                let match = chartData[0];
                let chank: Tour[] = []; 
                chartData = chartData.filter((x) => {
                    let result = true;
                    if (x.hotel === match.hotel && x.room === match.room) {
                        chank.push(x);
                        let date = x.checkDate.split('T')[0];
                        if (this.barChartLabels.indexOf(date) == -1) {
                            this.barChartLabels.push(date);
                        }
                        result = false;
                    }
                    return result;
                });
                chank.sort((a, b) => a.checkDate > b.checkDate ? 1 : -1);
                let price = chank.map(x => x.price);
                this.barChartData.push({data: price, label: match.hotel + ' ' + match.room});
            }
            this.barChartLabels.sort((a, b) => a > b ? 1: -1);
        }
    }
 
    private barChartLegend:boolean = true;
}

