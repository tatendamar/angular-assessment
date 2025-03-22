import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-sidebar.component.html',
  styleUrls: ['./skeleton-sidebar.component.css']
})
export class SkeletonSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
