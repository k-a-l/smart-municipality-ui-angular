import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFormPageComponent } from './citizen-form-page.component';

describe('CitizenFormPageComponent', () => {
  let component: CitizenFormPageComponent;
  let fixture: ComponentFixture<CitizenFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
