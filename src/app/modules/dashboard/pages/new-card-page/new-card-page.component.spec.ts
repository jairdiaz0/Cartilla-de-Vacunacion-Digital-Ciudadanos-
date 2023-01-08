import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardPageComponent } from './new-card-page.component';

describe('NewCardPageComponent', () => {
  let component: NewCardPageComponent;
  let fixture: ComponentFixture<NewCardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
