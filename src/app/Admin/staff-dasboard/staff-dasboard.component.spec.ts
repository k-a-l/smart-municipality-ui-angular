import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDasboardComponent } from './staff-dasboard.component';

describe('StaffDasboardComponent', () => {
  let component: StaffDasboardComponent;
  let fixture: ComponentFixture<StaffDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffDasboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
