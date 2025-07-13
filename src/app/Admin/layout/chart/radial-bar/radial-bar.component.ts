/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-radial-bar',
  imports: [],
  templateUrl: './radial-bar.component.html',
  styleUrl: './radial-bar.component.scss'
})
export class RadialBarComponent {

}

*/

import { Component, ViewChild } from "@angular/core";


import {
  NgApexchartsModule,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  labels: string[] | any;
  colors: string[] | any;
  legend: ApexLegend | any;
  plotOptions: ApexPlotOptions | any;
  responsive: ApexResponsive | ApexResponsive[] | any;
};

@Component({
  selector: 'app-radial-bar',
  standalone: true,

  imports: [NgApexchartsModule],
  templateUrl: './radial-bar.component.html',
  styleUrl: './radial-bar.component.scss'
})
export class RadialBarComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [76, 67, 61, 90],
      chart: {
        height: 390,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      colors: ["#dab237", "#0f6100", "#dd0000", "#0077B5"],
      labels: ["Pending", "Approved", "Rejected", "Video Verified"],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true
        },
        formatter: function(seriesName: any, opts :any) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }
      ]
    };
  }
}

