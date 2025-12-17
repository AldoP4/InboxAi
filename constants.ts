import { EmailItem } from './types';

// ==========================================
// CONFIGURATION - EDIT THESE VARIABLES
// ==========================================
// Replace these with your actual N8N Webhook URLs
export const N8N_WEBHOOK_LIST = 'https://TU-DOMINIO-N8N/webhook/inbox-ai/list';
export const N8N_WEBHOOK_RESOLVE = 'https://TU-DOMINIO-N8N/webhook/inbox-ai/resolve';

// Set to false to force using real API
export const USE_MOCK_DATA = true; 

export const CATEGORIES = ['All', 'Sales', 'Support', 'Partnership', 'Internal', 'Other'];
export const PRIORITIES = ['All', 'Urgent', 'High', 'Medium', 'Low'];

// ==========================================
// MOCK DATA GENERATOR
// ==========================================
export const MOCK_EMAILS: EmailItem[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    from: 'ceo@techgiant.com',
    subject: 'Acquisition Proposal - Urgent Review',
    category: 'Partnership',
    priority: 'Urgent',
    summary: 'Proposing a merger discussion. Needs NDA signed by EOD.',
    action: 'Review NDA and forward to Legal',
    company: 'TechGiant Inc.',
    deadline: 'Today 5:00 PM',
    confidence: 0.98,
    status: 'pending'
  },
  {
    id: '2',
    date: new Date(Date.now() - 3600000).toISOString(),
    from: 'support@client.com',
    subject: 'System Down - Production Environment',
    category: 'Support',
    priority: 'Urgent',
    summary: 'Critical failure in the payment gateway integration.',
    action: 'Escalate to Engineering Team',
    company: 'BigClient Co',
    confidence: 0.95,
    status: 'pending'
  },
  {
    id: '3',
    date: new Date(Date.now() - 86400000).toISOString(),
    from: 'leads@marketing.com',
    subject: 'New Enterprise Lead: Cloud Migration',
    category: 'Sales',
    priority: 'High',
    summary: 'Qualified lead interested in $50k+ cloud migration package.',
    action: 'Schedule discovery call',
    company: 'Enterprise Corp',
    budget_estimate: '$50,000 - $80,000',
    confidence: 0.88,
    status: 'pending'
  },
  {
    id: '4',
    date: new Date(Date.now() - 172800000).toISOString(),
    from: 'hr@internal.com',
    subject: 'Q3 Performance Reviews',
    category: 'Internal',
    priority: 'Medium',
    summary: 'Reminder to submit team evaluations.',
    action: 'Fill out HR portal forms',
    deadline: 'Next Friday',
    confidence: 0.99,
    status: 'pending'
  },
  {
    id: '5',
    date: new Date(Date.now() - 200000000).toISOString(),
    from: 'newsletter@industry.com',
    subject: 'Weekly Tech Digest',
    category: 'Other',
    priority: 'Low',
    summary: 'Weekly summary of tech news. No action required.',
    action: 'Archive',
    confidence: 0.60,
    status: 'pending'
  }
];