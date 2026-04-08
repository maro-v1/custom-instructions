import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CaseRecord } from '../../shared/models/case-record.model';
import { API_ENDPOINTS } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseUrl = `${environment.backendUrl}${API_ENDPOINTS.CASES}`;

  constructor(private readonly http: HttpClient) {}

  getCases(): Observable<CaseRecord[]> {
    return this.http.get<CaseRecord[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Failed to fetch cases:', error);
        return throwError(() => error);
      })
    );
  }

  getCaseById(id: number): Observable<CaseRecord> {
    return this.http.get<CaseRecord>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Failed to fetch case:', error);
        return throwError(() => error);
      })
    );
  }
}
