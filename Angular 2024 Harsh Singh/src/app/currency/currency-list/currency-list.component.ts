import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent {


  currencies: any[] = [];

  constructor(private apiService: ApiService , private router : Router) { }

  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies() {
    this.apiService.getCurrencies().subscribe((data: any[]) => {
      this.currencies = data;
    });
  }
  
  editCurrency(currencyCode: string) {

    this.router.navigate([`/currencies/edit/${currencyCode}`]);
    console.log(currencyCode);
  }
  
  deleteCurrency(currencyCode: string) {
    if (confirm('Are you sure you want to delete this vendor?')) {
      this.apiService.deleteCurrency(currencyCode).subscribe(() => {
        this.loadCurrencies();
      });
    }
  }

  downloadCSV() {
    const csvData = this.convertToCSV(this.currencies);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'vendors.csv');
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
