import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModautoPage } from './modauto.page';

describe('ModautoPage', () => {
  let component: ModautoPage;
  let fixture: ComponentFixture<ModautoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModautoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
