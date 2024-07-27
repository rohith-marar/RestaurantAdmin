import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RestaurantFormComponent } from './restaurant-form.component';
import { RestaurantService } from '../service/restaurant.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RestaurantFormComponent', () => {
  let component: RestaurantFormComponent;
  let fixture: ComponentFixture<RestaurantFormComponent>;
  let restaurantService: jasmine.SpyObj<RestaurantService>;

  beforeEach(async () => {
    const restaurantServiceSpy = jasmine.createSpyObj('RestaurantService', [
      'getRestaurant',
      'addRestaurant',
      'updateRestaurant',
    ]);

    await TestBed.configureTestingModule({
      declarations: [RestaurantFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: RestaurantService, useValue: restaurantServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantFormComponent);
    component = fixture.componentInstance;
    restaurantService = TestBed.inject(
      RestaurantService
    ) as jasmine.SpyObj<RestaurantService>;

    restaurantService.getRestaurant.and.returnValue(
      of({
        id: 1,
        name: 'R1',
        description: 'asdasd',
        location: 'update',
        menu: 'abcd',
      })
    );
    restaurantServiceSpy.addRestaurant.and.returnValue(of({}));
    restaurantServiceSpy.updateRestaurant.and.returnValue(of({}));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addRestaurant on submit if no id is present', () => {
    component.id = null;
    component.restaurantForm.setValue({
      name: 'New Restaurant',
      description: 'New description',
      location: 'New location',
      menu: 'New menu',
    });
    component.onSubmit();
    expect(restaurantService.addRestaurant).toHaveBeenCalled();
  });

  it('should call updateRestaurant on submit if id is present', () => {
    component.id = 1;
    component.restaurantForm.setValue({
      name: 'Updated Restaurant',
      description: 'Updated description',
      location: 'Updated location',
      menu: 'Updated menu',
    });
    component.onSubmit();
    expect(restaurantService.updateRestaurant).toHaveBeenCalled();
  });

  it('should patch value on init if id is present', () => {
    component.ngOnInit();
    expect(component.restaurantForm.value.name).toBe('R1');
  });
});
