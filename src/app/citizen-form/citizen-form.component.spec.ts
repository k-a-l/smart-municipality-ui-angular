import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFormComponent } from './citizen-form.component';

describe('CitizenFormComponent', () => {
  let component: CitizenFormComponent;
  let fixture: ComponentFixture<CitizenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
