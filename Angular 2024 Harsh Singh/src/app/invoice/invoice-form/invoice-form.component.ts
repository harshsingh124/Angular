import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit{



  isEditMode:boolean = true
  invoices:any[] = []
  currencies: any[] = [];
  vendors: any[] = [];
  invoiceForm: FormGroup;
  currencyCode: string | null;
  invoiceNumber: number | any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
  
      invoiceNumber:['', Validators.required],
      currencyId: [null, Validators.required],
      vendorId: [null, Validators.required],
      invoiceAmount: ['', [Validators.required,Validators.min(0)]],
      invoiceReceivedDate: ['', Validators.required],
      invoiceDueDate: ['', Validators.required],  
    });

    this.loadCurrencies();
    this.loadVendors();

    this.route.paramMap.subscribe(params => {
      this.invoiceNumber = params.get('invoiceNumber');
      if (this.invoiceNumber) {
        this.isEditMode = true
        this.loadInvoice(this.invoiceNumber);
      }
    });
  }


  loadCurrencies() {
    this.apiService.getCurrencies().subscribe(
      data => this.currencies = data,
      error => console.error('Error loading currencies', error)
    );
  }

  loadVendors() {
    this.apiService.getVendors().subscribe(
      data => this.vendors = data,
      error => console.error('Error loading vendors', error)
    );
  }
  

  loadInvoice(invoiceNumber: number) {
    this.apiService.getInvoice(invoiceNumber).subscribe(
      data => {
        this.invoiceForm.patchValue(data);
      },
      error => {
        console.error('Error loading invocie data', error);
        this.router.navigate(['invoices']);
        console.log("error");
      }
    );
  }

  updateInvoice() {
    if (this.invoiceNumber) {
      const updatedInvoice = {
        ...this.invoiceForm.value
      };
      console.log(updatedInvoice);
      this.apiService.updateInvoice(updatedInvoice).subscribe(
        () => this.router.navigate(['invoices']),
        error => console.error('Error updating invoice', error)
      );
    }
  }

  addInvoice() {
    this.apiService.addInvoice(this.invoiceForm.value).subscribe(
      () => this.router.navigate(['invoices']),
      error => console.error('Error adding invoice', error)
    );
  }
}
