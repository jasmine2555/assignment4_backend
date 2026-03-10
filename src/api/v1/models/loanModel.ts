export type LoanStatus = "pending" | "under_review" | "flagged";

export interface Loan {
  id: number;
  applicant: string;
  amount: number;
  status: LoanStatus;
  createdAt: string;
}

export interface CreateLoanBody {
  applicant: string;
  amount: number;
}

export interface UpdateLoanBody {
  applicant?: string;
  amount?: number;
  status?: LoanStatus;
}