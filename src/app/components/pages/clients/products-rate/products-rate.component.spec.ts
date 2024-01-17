import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRateComponent } from './products-rate.component';

describe('ProductsRateComponent', () => {
  let component: ProductsRateComponent;
  let fixture: ComponentFixture<ProductsRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsRateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
