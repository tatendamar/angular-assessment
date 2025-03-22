import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SkeletonSidebarComponent } from '../skeleton-sidebar/skeleton-sidebar.component';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule, SkeletonSidebarComponent],
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.css']
})
export class SkeletonLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
