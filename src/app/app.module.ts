import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ParserComponent } from './components/parser/parser.component';
import { CardComponent } from './components/card/card.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [AppComponent, ParserComponent, CardComponent, FilterComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
