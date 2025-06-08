import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthCertificateRequestListComponent } from './birth-certificate-request-list.component';

describe('BirthCertificateRequestListComponent', () => {
  let component: BirthCertificateRequestListComponent;
  let fixture: ComponentFixture<BirthCertificateRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthCertificateRequestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthCertificateRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
