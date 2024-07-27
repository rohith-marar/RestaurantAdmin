import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant, RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  public restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService, private router: Router) {}

  public ngOnInit(): void {
    this.loadRestaurants();
    this.restaurantService.restaurantDeleted.subscribe(() => {
      this.loadRestaurants();
    });
  }

  public loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });
  }

  public editRestaurant(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  public deleteRestaurant(id: number): void {
    this.restaurantService.deleteRestaurant(id).subscribe(() => {
      this.restaurants = this.restaurants.filter(r => r.id !== id);
      this.loadRestaurants();
    });
  }

  public navigateToAddRestaurant(): void {
    this.router.navigate(['/add']);
  }
}

