import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {DashboardService} from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalRequests: number = 0;
  totalCitizens = 0;
  approvedRequests = 0; // Optional
  rejectedRequests = 0; // Optional
  pendingRequests = 0;
  processingTimeAverage = 0; // Optional

  constructor(private dashboardService: DashboardService) {
  }

  // The ngOnInit lifecycle hook is called after the component has been initialized
  // It's a good place to fetch data
  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.dashboardService.getTotalCitizens().subscribe((data: number) => this.totalCitizens = data);
    this.dashboardService.getTotalRequests().subscribe((data: number) => this.totalRequests = data);
    this.dashboardService.getPendingRequests().subscribe((data: number) => this.pendingRequests = data);

    this.dashboardService.getApprovedRequests().subscribe((data: number) => this.approvedRequests = data);
    this.dashboardService.getRejectedRequests().subscribe((data: number) => this.rejectedRequests = data);
    //this.dashboardService.getAverageProcessingTime().subscribe((data: number) => this.processingTimeAverage = data);
  }
}
