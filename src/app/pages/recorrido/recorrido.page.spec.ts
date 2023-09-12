import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecorridoPage } from './recorrido.page';

describe('RecorridoPage', () => {
  let component: RecorridoPage;
  let fixture: ComponentFixture<RecorridoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecorridoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
