import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MencionComponent } from './mencion.component';

describe('MencionComponent', () => {
  let component: MencionComponent;
  let fixture: ComponentFixture<MencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MencionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
