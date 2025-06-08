import { ComponentFixture, TestBed } from '@angular/core/testing';


class BitthCertificateFormComponent {
}

describe('BirthCertificateFormComponent', () => {
  let component: BitthCertificateFormComponent;
  let fixture: ComponentFixture<BitthCertificateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitthCertificateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BitthCertificateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
