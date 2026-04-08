import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CaseRecord } from '../../shared/models/case-record.model';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  cases$!: Observable<CaseRecord[]>;
  displayedColumns: string[] = ['referenceNumber', 'title', 'status', 'assignedTo'];

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.cases$ = this.dashboardService.getCases();
  }
}
