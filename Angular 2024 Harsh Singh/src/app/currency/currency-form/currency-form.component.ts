import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.css']
})
export class CurrencyFormComponent implements OnInit {

  currencyForm: FormGroup;
  currencyCode: string | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currencyForm = this.fb.group({
      currencyName: ['', Validators.required],
      currencyCode: ['', Validators.required],
      isActive: [false, Validators.required]  
    });

    this.route.paramMap.subscribe(params => {
      this.currencyCode = params.get('currencyCode');
      if (this.currencyCode) {
        this.loadCurrency(this.currencyCode);
      }
    });
  }

  loadCurrency(currencyCode: string) {
    this.apiService.getCurrency(currencyCode).subscribe(
      data => {
        this.currencyForm.patchValue(data);
      },
      error => {
        console.error('Error loading currency data', error);
        this.router.navigate(['/currencies']);
      }
    );
  }

  updateCurrency() {
    if (this.currencyCode) {
      const updatedCurrency = {
        ...this.currencyForm.value
      };
      console.log(updatedCurrency);
      this.apiService.updateCurrency(updatedCurrency).subscribe(
        () => this.router.navigate(['/currencies/']),
        error => console.error('Error updating currency', error)
      );
    }
  }


  addCurrency() {
    this.apiService.addCurrency(this.currencyForm.value).subscribe(
      () => this.router.navigate(['/currencies']),
      error => console.error('Error adding currency', error)
    );
  }
}
