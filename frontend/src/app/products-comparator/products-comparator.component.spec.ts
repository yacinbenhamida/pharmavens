import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComparatorComponent } from './products-comparator.component';

describe('ProductsComparatorComponent', () => {
  let component: ProductsComparatorComponent;
  let fixture: ComponentFixture<ProductsComparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsComparatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
