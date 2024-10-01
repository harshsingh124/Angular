import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  private apiUrlvendor = 'https://localhost:7162/Vendor'; 
  private apiUrlinvoice = 'https://localhost:7162/Invoice'; 
  private apiUrlcurrency = 'https://localhost:7162/api/Currency/Currency'; 

  constructor(private http: HttpClient) { }

  // Vendor Methods
  getVendors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlvendor}/list`).pipe(
      catchError(this.handleError)
    );
  }

  getVendor(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlvendor}/getbyid/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addVendor(vendor: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlvendor}/add`, vendor).pipe(
      catchError(this.handleError)
    );
  }

  updateVendor(vendor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlvendor}/editVendor`, vendor).pipe(
      catchError(this.handleError)
    );
  }

  deleteVendor(vendorCode: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlvendor}/delete/${vendorCode}`).pipe(
      catchError(this.handleError)
    );
  }

  // Error Handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw new Error('Something went wrong; please try again later.');
  }


  // // Invoice Methods
  getInvoices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlinvoice}/list`);
  }

  getInvoice(invoicenumber: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlinvoice}/getbyid/${invoicenumber}`).pipe(
      catchError(this.handleError)
    );
  }

  addInvoice(invoice: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlinvoice}/add`, invoice);
  }

  
  updateInvoice(invocie: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlinvoice}/Edit`, invocie).pipe(
      catchError(this.handleError)
    );
  }

  deleteInvoice(invoiceNumber: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlinvoice}/Delete/${invoiceNumber}`);
  }

  // Currency Methods
 
  getCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlcurrency}/AllCurrency`);
  }
 
  getCurrency(currencyCode:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlcurrency}/getbyid/${currencyCode}`);
  }
 
  addCurrency(currency: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlcurrency}/AddCurrency`, currency);
  }
 
  updateCurrency(currency: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlcurrency}/Edit`, currency);
  }
 
  deleteCurrency(currencyCode: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlcurrency}/delete/${currencyCode}`);
  }
}
