import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent {

  vendors: any[] = [];
isEditMode: any;


  constructor(private apiService: ApiService , private router : Router) { }

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors() {
    this.apiService.getVendors().subscribe((data: any[]) => {
      this.vendors = data;
    });
  }
  
  editVendor(vendorCode: string) {
    this.router.navigate([`/vendors/edit/${vendorCode}`]);
    console.log(vendorCode);

  }
  
  deleteVendor(vendorCode: string) {
    if (confirm('Are you sure you want to delete this vendor?')) {
      this.apiService.deleteVendor(vendorCode).subscribe(() => {
        this.loadVendors();
      });
    }
  }


  downloadCSV() {
    const csvData = this.convertToCSV(this.vendors);
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

