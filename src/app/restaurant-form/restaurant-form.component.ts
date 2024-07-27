import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css'],
})
export class RestaurantFormComponent implements OnInit {
  public restaurantForm: FormGroup;
  public id: any;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.restaurantForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ],
      ],
      location: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      menu: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  public ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null; 
    console.log(this.id);
    if (this.id !== null) {
      this.restaurantService.getRestaurant(this.id).subscribe((restaurant) => {
        console.log(restaurant);
        if (restaurant) {
          this.restaurantForm.patchValue(restaurant);
        }
      });
    }
  }
  
  public onSubmit(): void {
    if (this.restaurantForm.valid) {
      const restaurantData = this.restaurantForm.value;
      if (this.id) {
        this.restaurantService
          .updateRestaurant(this.id, restaurantData)
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      } else {
        this.restaurantService.addRestaurant(restaurantData).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
