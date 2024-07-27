import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  location: string;
  menu:string;
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private localStorageKey = 'restaurants';
  public restaurantDeleted = new EventEmitter<number>();
  private restaurants: Restaurant[] = [
    { id: 1, name: 'R1', description: 'Restuarant 1', location: 'update',menu:'Chicken' },
    { id: 2, name: 'R2', description: 'Restuarant 2', location: 'update1',menu:'Dosa' },
  ];

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  // Will replace with backend API and calls the http methods accordingly

  // Here we will use local array of objects for initial data and utilize localStorage for persisting data, follow these steps:

  private loadFromLocalStorage(): void {
    const storedRestaurants = localStorage.getItem(this.localStorageKey);
    if (storedRestaurants) {
      this.restaurants = JSON.parse(storedRestaurants);
    } else {
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.restaurants));
  }

  public getRestaurants(): Observable<Restaurant[]> {
    return of(this.restaurants);
  }

  public getRestaurant(id: number): Observable<Restaurant | undefined> {
    const restaurant = this.restaurants.find((r) => r.id === id);
    return of(restaurant);
  }

  public addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    restaurant.id = this.restaurants.length
      ? Math.max(...this.restaurants.map((r) => r.id)) + 1
      : 1;
    this.restaurants.push(restaurant);
    this.saveToLocalStorage();
    return of(restaurant);
  }

  public updateRestaurant(id: number, restaurant: Restaurant): Observable<Restaurant | undefined> {
    const index = this.restaurants.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.restaurants[index] = { ...restaurant, id };
      this.saveToLocalStorage();
      return of(this.restaurants[index]);
    }
    return of(undefined);
  }

  public deleteRestaurant(id: number): Observable<void> {
    this.restaurants = this.restaurants.filter((r) => r.id !== id);
    this.saveToLocalStorage();
    this.restaurantDeleted.emit(id); 
    return of();
  }
}

