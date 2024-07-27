import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant, RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.loadRestaurants();
    this.restaurantService.restaurantDeleted.subscribe(() => {
      this.loadRestaurants();
    });
  }

  loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });
  }

  editRestaurant(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteRestaurant(id: number): void {
    this.restaurantService.deleteRestaurant(id).subscribe(() => {
      this.restaurants = this.restaurants.filter(r => r.id !== id);
      this.loadRestaurants();
    });
  }

  navigateToAddRestaurant(): void {
    this.router.navigate(['/add']);
  }
}

