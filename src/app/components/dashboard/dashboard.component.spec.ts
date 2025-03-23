/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { Subject } from 'rxjs';
import { DashboardStore } from './store/dashboard.store';
import { ToastrService } from 'ngx-toastr';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
   await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('DashboardComponent Extended Tests', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardStore: DashboardStore;
  let toastrService: ToastrService;

  beforeEach(async () => {
    const dashboardStoreMock = {
      vm$: new Subject(),
      results$: new Subject(),
      loadResult: jasmine.createSpy('loadResult')
    };

    const toastrServiceMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        { provide: DashboardStore, useValue: dashboardStoreMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    }).compileComponents();

    dashboardStore = TestBed.inject(DashboardStore);
    toastrService = TestBed.inject(ToastrService);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with default values', () => {
    expect(component.searchResults).toEqual([]);
    expect(component.selectedStars).toBeFalse();
    expect(component.p).toBe(1);
    expect(component.searchTerm).toBe('');
    expect(component.info).toBeFalse();
  });

  it('should call dashboardStore.loadResult when onSearch is called', () => {
    const testQuery = 'test search';
    component.onSearch(testQuery);
    expect(dashboardStore.loadResult).toHaveBeenCalledWith({ query: testQuery });
  });

  it('should update searchTerm when onSearch is called', () => {
    const testQuery = 'test search';
    component.onSearch(testQuery);
    expect(component.searchTerm).toBe(testQuery);
  });

  it('should update info flag when results are received', () => {
    component.onSearch('test');
    (dashboardStore.results$ as Subject<any>).next([{ id: 1 }]);
    expect(component.info).toBeTrue();
  });

  it('should not update info flag when empty results are received', () => {
    component.onSearch('test');
    (dashboardStore.results$ as Subject<any>).next([]);
    expect(component.info).toBeFalse();
  });

  it('should have resultVm$ connected to dashboardStore.vm$', () => {
    expect(component.resultVm$).toBeTruthy();
    expect(component.resultVm$).toBe(dashboardStore.vm$);
  });
});
