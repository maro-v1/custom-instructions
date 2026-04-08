import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CaseRecord } from '../../shared/models/case-record.model';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockDashboardService: jest.Mocked<DashboardService>;

  const mockCases: CaseRecord[] = [
    {
      id: 1,
      referenceNumber: 'CASE-001',
      title: 'Test Case',
      status: { code: 'OPEN', description: 'Open', isActive: true },
      assignedTo: 'Test User',
      createdDate: '2025-01-15T10:00:00Z',
    },
  ];

  beforeEach(async () => {
    mockDashboardService = {
      getCases: jest.fn().mockReturnValue(of(mockCases)),
      getCaseById: jest.fn(),
    } as unknown as jest.Mocked<DashboardService>;

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: DashboardService, useValue: mockDashboardService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load cases on init', () => {
    fixture.detectChanges();
    expect(mockDashboardService.getCases).toHaveBeenCalled();
  });

  it('should display case data in the table', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('CASE-001');
  });
});
