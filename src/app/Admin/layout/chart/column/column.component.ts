import { Component, ViewChild, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  NgApexchartsModule
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-column-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  private http = inject(HttpClient);

  baseUrl = 'http://localhost:8080/api/v1/dashboard';
  // Full month names in uppercase matching backend keys
  months: string[] = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL',
    'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER',
    'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  ngOnInit(): void {
    Promise.all([
      this.http.get<Record<string, number>>(`${this.baseUrl}/birth/count-by-month`).toPromise(),
      this.http.get<Record<string, number>>(`${this.baseUrl}/death/count-by-month`).toPromise(),
      this.http.get<Record<string, number>>(`${this.baseUrl}/marriage/count-by-month`).toPromise()
    ]).then(([birthData = {}, deathData = {}, marriageData = {}]) => {
      console.log('birthData', birthData);
      console.log('deathData', deathData);
      console.log('marriageData', marriageData);
      this.buildChart(birthData, deathData, marriageData);
    });
  }


  buildChart(
    birth: Record<string, number>,
    death: Record<string, number>,
    marriage: Record<string, number>
  ) {
    // Helper: map backend data to array of numbers for chart series
    const getData = (data: Record<string, number>) =>
      this.months.map(month => data[month] || 0);

    this.chartOptions = {
      series: [
        { name: 'Birth', data: getData(birth) },
        { name: 'Death', data: getData(death) },
        { name: 'Marriage', data: getData(marriage) }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: this.months.map(m => m.slice(0, 3)) // Display "JAN", "FEB", ...
      },
      yaxis: {
        title: {
          text: 'Count'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val} requests`
        }
      },
      legend: {
        position: 'top'
      }
    };
  }
}
