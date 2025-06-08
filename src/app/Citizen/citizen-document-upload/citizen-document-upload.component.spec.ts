import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenDocumentUploadComponent } from './citizen-document-upload.component';

describe('CitizenDocumentUploadComponent', () => {
  let component: CitizenDocumentUploadComponent;
  let fixture: ComponentFixture<CitizenDocumentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenDocumentUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenDocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
