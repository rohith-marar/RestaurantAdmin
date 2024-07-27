import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantListComponent } from './restaurant-list.component';
import { RestaurantService } from '../service/restaurant.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

describe('RestaurantListComponent', () => {
  let component: RestaurantListComponent;
  let fixture: ComponentFixture<RestaurantListComponent>;
  let restaurantService: jasmine.SpyObj<RestaurantService>;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('RestaurantService', [
      'getRestaurants',
      'deleteRestaurant',
    ]);
    spy.restaurantDeleted = new EventEmitter<number>();

    await TestBed.configureTestingModule({
      declarations: [RestaurantListComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: RestaurantService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantListComponent);
    component = fixture.componentInstance;
    restaurantService = TestBed.inject(
      RestaurantService
    ) as jasmine.SpyObj<RestaurantService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load restaurants on init', () => {
    const mockRestaurants = [
      {
        id: 1,
        name: 'R1',
        description: 'Restaurant 1',
        location: 'Location 1',
        menu: 'Menu 1',
      },
      {
        id: 2,
        name: 'R2',
        description: 'Restaurant 2',
        location: 'Location 2',
        menu: 'Menu 2',
      },
    ];
    restaurantService.getRestaurants.and.returnValue(of(mockRestaurants));

    component.ngOnInit();

    expect(restaurantService.getRestaurants).toHaveBeenCalled();
    expect(component.restaurants).toEqual(mockRestaurants);
  });

  it('should call deleteRestaurant and update the list', () => {
    const mockRestaurants = [
      {
        id: 1,
        name: 'R1',
        description: 'Restaurant 1',
        location: 'Location 1',
        menu: 'Menu 1',
      },
      {
        id: 2,
        name: 'R2',
        description: 'Restaurant 2',
        location: 'Location 2',
        menu: 'Menu 2',
      },
    ];
    restaurantService.getRestaurants.and.returnValue(of(mockRestaurants));
    restaurantService.deleteRestaurant.and.returnValue(of(void 0));
    component.ngOnInit();
    component.deleteRestaurant(1);
    expect(restaurantService.deleteRestaurant).toHaveBeenCalledWith(1);
    expect(component.restaurants.length).toBe(2);
    expect(component.restaurants.find((r) => r.id === 1)).toEqual({
      id: 1,
      name: 'R1',
      description: 'Restaurant 1',
      location: 'Location 1',
      menu: 'Menu 1',
    });
  });

  it('should display message if no restaurants', () => {
    restaurantService.getRestaurants.and.returnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.no-restaurants-message')?.textContent
    ).toContain('No restaurants available. Please add some restaurants.');
  });

  it('should navigate to add restaurant on button click', () => {
    spyOn(router, 'navigate');
    component.navigateToAddRestaurant();
    expect(router.navigate).toHaveBeenCalledWith(['/add']);
  });

  it('should navigate to edit restaurant on button click', () => {
    spyOn(router, 'navigate');
    component.editRestaurant(1);
    expect(router.navigate).toHaveBeenCalledWith(['/edit', 1]);
  });
});
