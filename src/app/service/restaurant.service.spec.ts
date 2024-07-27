import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant.service';
import { of } from 'rxjs';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestaurantService],
    });
    service = TestBed.inject(RestaurantService);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === service['localStorageKey']) {
        return null;
      }
      return null;
    });
    spyOn(localStorage, 'setItem').and.callFake(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve restaurants from local storage', () => {
    const dummyRestaurants: Restaurant[] = [
      { id: 1, name: 'R1', description: 'Restuarant 1', location: 'update', menu: 'Chicken' },
      { id: 2, name: 'R2', description: 'Restuarant 2', location: 'update1', menu: 'Dosa' },
    ];

    spyOn(service, 'getRestaurants').and.returnValue(of(dummyRestaurants));

    service.getRestaurants().subscribe((restaurants) => {
      expect(restaurants.length).toBe(2);
      expect(restaurants).toEqual(dummyRestaurants);
    });
  });

  it('should add a new restaurant', () => {
    const newRestaurant: Restaurant = {
      id: 3,
      name: 'R3',
      description: 'new desc',
      location: 'new location',
      menu: 'abcd',
    };

    service.addRestaurant(newRestaurant).subscribe((restaurant) => {
      expect(restaurant).toEqual(newRestaurant);
    });
  });

  it('should update an existing restaurant', () => {
    const updatedRestaurant: Restaurant = {
      id: 1,
      name: 'Updated R1',
      description: 'updated desc',
      location: 'updated location',
      menu: 'abcd',
    };

    service.updateRestaurant(1, updatedRestaurant).subscribe((restaurant) => {
      expect(restaurant).toEqual(updatedRestaurant);
    });
  });

  it('should delete a restaurant', () => {
    service.deleteRestaurant(1).subscribe(() => {
      service.getRestaurants().subscribe((restaurants) => {
        expect(restaurants.length).toBe(1);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
