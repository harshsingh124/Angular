import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent implements OnInit {

  vendorForm: FormGroup;
  vendorCode: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.vendorForm = this.fb.group({
      vendorCode: ['', Validators.required],
      vendorLongName: ['', Validators.required],
      vendorPhoneNumber: ['', [Validators.required,Validators.pattern(/^\d{10}$/)]],
      vendorEmail: ['', [Validators.required, Validators.email]],
      vendorCreatedOn: [new Date()],
      isActive:[true]
    });

    this.route.paramMap.subscribe(params => {
      this.vendorCode = params.get('vendorCode');
      if (this.vendorCode) {
        this.isEditMode = true;
        this.loadVendor(this.vendorCode);
      }
    });
  }

  loadVendor(vendorCode: string) {
    this.apiService.getVendor(vendorCode).subscribe(
      data => {
        this.vendorForm.patchValue(data);
      },
      error => {
        console.error('Error loading vendor data', error);
        
        this.router.navigate(['vendors']);
      }
    );
  }

  updateVendor(): any {
    if (this.vendorCode) {
      const updatedVendor = {
        ...this.vendorForm.value 
      };
      console.log(updatedVendor);
      this.apiService.updateVendor(updatedVendor).subscribe(
        (res) => {this.router.navigate(['vendors'])},
        (error) => console.error('Error updating currency', error)
      );
    }
  }


addVendor(){
  const updatedVendor = {
    ...this.vendorForm.value 
  };
  console.log(updatedVendor);
  this.apiService.addVendor(this.vendorForm.value).subscribe(() => {
    this.router.navigate(['vendors']);
    
  })
}
}