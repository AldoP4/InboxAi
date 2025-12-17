export type Priority = 'Urgent' | 'High' | 'Medium' | 'Low';
export type Category = 'Sales' | 'Support' | 'Partnership' | 'Internal' | 'Spam' | 'Other';
export type Status = 'pending' | 'resolved';

export interface EmailItem {
  id: string; // UUID or composite key
  date: string; // ISO string
  from: string;
  subject: string;
  category: Category;
  priority: Priority;
  summary: string;
  action: string;
  company?: string;
  budget_estimate?: string;
  deadline?: string;
  confidence: number;
  status: Status;
}

export interface FilterState {
  category: string;
  priority: string;
}

// N8N Response might not have ID, so we might need to extend it or map it
export interface APIResponseItem {
  date: string;
  from: string;
  subject: string;
  category: string;
  priority: string;
  summary: string;
  action: string;
  company?: string;
  budget_estimate?: string;
  deadline?: string;
  confidence: number;
  status?: string;
}