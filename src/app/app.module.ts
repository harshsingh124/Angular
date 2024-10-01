import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorFormComponent } from './vendor/vendor-form/vendor-form.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { CurrencyListComponent } from './currency/currency-list/currency-list.component';
import { CurrencyFormComponent } from './currency/currency-form/currency-form.component';
import { InvoiceFormComponent } from './invoice/invoice-form/invoice-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    VendorListComponent,
    VendorFormComponent,
    InvoiceListComponent,
    CurrencyListComponent,
    CurrencyFormComponent,
    InvoiceFormComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
