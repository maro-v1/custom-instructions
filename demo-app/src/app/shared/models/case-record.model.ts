export interface CaseRecord {
  id: number;
  referenceNumber: string;
  title: string;
  status: CaseStatus;
  assignedTo?: string;
  createdDate: string;
  lastModifiedDate?: string;
  notes?: string;
}

export interface CaseStatus {
  code: string;
  description: string;
  isActive: boolean;
}
