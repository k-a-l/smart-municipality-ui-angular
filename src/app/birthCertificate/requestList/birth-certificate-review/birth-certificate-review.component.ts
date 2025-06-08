import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BirthCertificateService } from '../../birth-certificate-service.service';
import { CitizenService } from '../../../services/citizen.service';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-birth-certificate-review',
  templateUrl: './birth-certificate-review.component.html',
  imports: [
    MatProgressBar,
    NgIf,
    MatButton
  ],
  styleUrls: ['./birth-certificate-review.component.scss']
})
export class BirthCertificateReviewComponent implements OnInit {
  requestId!: number;
  request: any;
  citizen: any;
  isLoading = true;
  requestedBy: number | undefined  ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private birthCertificateService: BirthCertificateService,
    private citizenService: CitizenService
  ) {}

  ngOnInit(): void {
    this.requestId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRequest();
  }

  loadRequest(): void {
    this.birthCertificateService.getRequestById(this.requestId).subscribe({
      next: (req) => {
        this.request = req;
        console.log("Data in the birth request",req.requestedBy);
        this.requestedBy= req.requestedBy;
        if (req.requestedBy) {
          this.loadCitizen(req.requestedBy);
        } else {
          console.error('Citizen data is missing in request:', req);
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching request:', err);
        this.isLoading = false;
      }
    });
  }


  loadCitizen(citizenId: number | undefined): void {
    if (typeof this.requestedBy === "number") {
      this.citizenService.getCitizenById(this.requestedBy).subscribe({
        next: (citizenData) => {
          this.citizen = citizenData;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching citizen:', err);
          this.isLoading = false;
        }
      });
    }
  }

  reviewParents(): void {
    this.router.navigate(['/citizen/review', this.requestedBy]);
  }
}
