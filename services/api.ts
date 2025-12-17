import { EmailItem, APIResponseItem } from '../types';
import { N8N_WEBHOOK_LIST, N8N_WEBHOOK_RESOLVE, USE_MOCK_DATA, MOCK_EMAILS } from '../constants';

// Helper to generate ID if missing (API might not return one)
const generateId = () => Math.random().toString(36).substr(2, 9);

export const fetchEmails = async (): Promise<EmailItem[]> => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_EMAILS;
  }

  try {
    const response = await fetch(N8N_WEBHOOK_LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data: APIResponseItem[] = await response.json();

    // Transform API data to internal model (add IDs if missing, ensure types)
    return data.map((item, index) => ({
      ...item,
      id: (item as any).id || `${Date.now()}-${index}`, // Fallback ID
      category: item.category as any,
      priority: item.priority as any,
      status: (item.status || 'pending') as any
    }));

  } catch (error) {
    console.warn("API request failed, falling back to mock data for demo purposes if enabled in code.", error);
    // In a real app, you might want to re-throw this. 
    // For this specific demo request, if the user hasn't set up the N8N server yet, 
    // we fallback to mock so they see the UI.
    if (process.env.NODE_ENV === 'development') {
        console.info("Serving Mock Data due to fetch failure.");
        return MOCK_EMAILS;
    }
    throw error;
  }
};

export const resolveEmail = async (id: string): Promise<boolean> => {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }

  try {
    const response = await fetch(N8N_WEBHOOK_RESOLVE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status: 'resolved' }),
    });

    if (!response.ok) {
      throw new Error('Failed to resolve email');
    }
    return true;
  } catch (error) {
    console.error("Resolve API failed", error);
    throw error;
  }
};