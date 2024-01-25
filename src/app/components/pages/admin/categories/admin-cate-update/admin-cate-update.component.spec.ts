import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCateUpdateComponent } from './admin-cate-update.component';

describe('AdminCateUpdateComponent', () => {
  let component: AdminCateUpdateComponent;
  let fixture: ComponentFixture<AdminCateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCateUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
