// src/app/citizen/citizen.component.ts
import { Component, OnInit } from '@angular/core';
import { MunicipalityService } from '../services/municipality.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citizen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.scss']
})
export class CitizenComponent implements OnInit {
  citizens: any[] = [];

  constructor(private muniService: MunicipalityService) {}

  ngOnInit() {
    this.muniService.getAllCitizens().subscribe({
      next: (data) => {
        this.citizens = data;
        console.log('Citizens:', data);  // should log data
      },
      error: (err) => {
        console.error('Error:', err);  // will log if something fails
      }
    });
  }
}
