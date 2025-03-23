import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { SearchService } from './services/search.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardStore } from './store/dashboard.store';
import { SearchResult } from './services/searchTypes.type';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchbarComponent,
    NgxPaginationModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SearchService, DashboardStore]
})
export class DashboardComponent {


  private readonly dashboardStore = inject(DashboardStore);
  private readonly toastr =inject(ToastrService)

  resultVm$ = this.dashboardStore.vm$;


  searchResults: SearchResult[] = [];
  selectedStars: boolean = false ;
  p: number = 1;

  searchTerm: string = '';

  info: boolean = false


  onSearch(query: string): void {

    this.searchTerm = query;



    this.dashboardStore.loadResult({query})

    this.dashboardStore.results$.subscribe((results) => {
     
      if(results.length > 0) {
            this.info = true;
          }
    });
  }


}
