import { Component, OnInit, ViewChild } from '@angular/core';
import { MunicipalityService } from '../../services/municipality.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-Citizen',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.scss']
})
export class CitizenComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dob', 'gender', 'phone', 'municipality', 'status', 'documents', 'actions'];
  dataSource = new MatTableDataSource<any>();

  // Filter fields
  nameFilter = '';
  dobFilter = '';
  genderFilter = '';
  statusFilter = '';

  constructor(private muniService: MunicipalityService, private router: Router) {}

  ngOnInit() {
    this.muniService.getAllCitizens().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.filterPredicate = this.createFilter();
      },
      error: (err) => {
        console.error('Error loading citizens:', err);
      }
    });
  }

  applyFilters(): void {
    const filterValues = {
      name: this.nameFilter.trim().toLowerCase(),
      dob: this.dobFilter,
      gender: this.genderFilter,
      status: this.statusFilter
    };
    this.dataSource.filter = JSON.stringify(filterValues);
  }

  createFilter(): (data: any, filter: string) => boolean {
    return (data, filter) => {
      const searchTerms = JSON.parse(filter);
      const fullName = (data.firstName + ' ' + (data.middleName || '') + ' ' + data.lastName).toLowerCase();
      return (
        fullName.includes(searchTerms.name) &&
        (!searchTerms.dob || data.dateOfBirth === searchTerms.dob) &&
        (!searchTerms.gender || data.gender === searchTerms.gender) &&
        (!searchTerms.status || data.status === searchTerms.status)
      );
    };
  }

  reviewCitizen(citizen: any) {
    this.router.navigate(['/citizen/review', citizen.id]).then(success => {
      if (success) console.log('Navigation successful');
    });
  }

  updateCitizen(c: number) {
    this.router.navigate(['/citizen/update', c]).then(success => {
      if (success) console.log('Navigation successful');
    });

  }


}
