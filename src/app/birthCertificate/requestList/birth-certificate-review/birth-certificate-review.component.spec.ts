import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthCertificateReviewComponent } from './birth-certificate-review.component';

describe('BirthCertificateReviewComponent', () => {
  let component: BirthCertificateReviewComponent;
  let fixture: ComponentFixture<BirthCertificateReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthCertificateReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthCertificateReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
