import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCateCreateComponent } from './admin-cate-create.component';

describe('AdminCateCreateComponent', () => {
  let component: AdminCateCreateComponent;
  let fixture: ComponentFixture<AdminCateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCateCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
