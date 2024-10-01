import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent {
 
  invoices: any[] = [];
  isEditMode:boolean = false

  constructor(private apiService: ApiService , private router : Router) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.apiService.getInvoices().subscribe((data: any[]) => {
      this.invoices = data;
    });
  }

  editInvoice(invoiceNumber: number) {
    this.router.navigate([`invoices/edit/${invoiceNumber}`]);
    console.log(invoiceNumber);
  }
  
  deleteInvoice(id:number) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.apiService.deleteInvoice(id).subscribe(() => {
        this.loadInvoices();
      });
    }
  }

  downloadCSV() {
    const csvData = this.convertToCSV(this.invoices);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'invoices.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertToCSV(vendors: any[]): string {
    const header = 'Vendor ID,Vendor Name,Vendor Code,Vendor Phone Number,Vendor Email,Vendor Created On,Vendor Is Active\n';
    const rows = vendors.map(vendor => [
      vendor.vendorId,
      vendor.vendorLongName,
      vendor.vendorCode,
      vendor.vendorPhoneNumber,
      vendor.vendorEmail,
      vendor.vendorCreatedOn,
      vendor.isActive
    ].join(',')).join('\n');

    return header + rows;
  }
}
