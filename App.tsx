import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Inbox, Filter, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { EmailItem, FilterState } from './types';
import { fetchEmails, resolveEmail } from './services/api';
import { UrgentSection } from './components/UrgentSection';
import { EmailTable } from './components/EmailTable';
import { FilterBar } from './components/FilterBar';

const App: React.FC = () => {
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    priority: 'All'
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEmails();
      setEmails(data);
    } catch (err) {
      console.error("Failed to load emails", err);
      setError("Failed to load inbox data. Please check connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResolve = async (id: string) => {
    // Optimistic update
    const previousEmails = [...emails];
    setEmails(prev => prev.map(e => e.id === id ? { ...e, status: 'resolved' } : e));

    try {
      await resolveEmail(id);
    } catch (err) {
      console.error("Failed to resolve", err);
      // Revert on failure
      setEmails(previousEmails);
      alert("Could not mark as resolved. Please try again.");
    }
  };

  const filteredEmails = useMemo(() => {
    return emails.filter(email => {
      const matchesCategory = filters.category === 'All' || email.category === filters.category;
      const matchesPriority = filters.priority === 'All' || email.priority === filters.priority;
      // We generally want to show pending items in the main list, or show resolved if specifically asked?
      // For this dashboard, let's keep 'resolved' items visible but visually dimmed, or filter them out if needed.
      // Let's hide resolved items from the main urgency flows usually, but maybe keep them in list for history.
      // For this "Inbox" view, let's hide resolved items unless we want a history view.
      // Assuming "Inbox" means pending tasks.
      const isPending = email.status !== 'resolved';
      
      return matchesCategory && matchesPriority && isPending;
    });
  }, [emails, filters]);

  const urgentEmails = useMemo(() => {
    return emails.filter(e => e.priority === 'Urgent' && e.status !== 'resolved');
  }, [emails]);

  const stats = useMemo(() => {
    return {
      total: emails.filter(e => e.status !== 'resolved').length,
      urgent: emails.filter(e => e.status !== 'resolved' && e.priority === 'Urgent').length,
      high: emails.filter(e => e.status !== 'resolved' && e.priority === 'High').length,
    };
  }, [emails]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-black text-white p-2 rounded-lg">
              <Inbox size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 tracking-tight leading-none">Inbox AI</h1>
              <span className="text-xs text-gray-500 font-medium">Aldo Pazzi Dashboard</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={loadData} 
              disabled={loading}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all disabled:opacity-50"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
               <span className="font-semibold text-gray-900">{stats.total}</span> Pending
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Connection Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 text-red-700 animate-fade-in">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Urgent Section */}
        {urgentEmails.length > 0 && !loading && (
          <section className="animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <h2 className="text-lg font-semibold text-gray-900">Requires Attention</h2>
            </div>
            <UrgentSection emails={urgentEmails} onResolve={handleResolve} />
          </section>
        )}

        {/* Main Inbox */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">All Messages</h2>
            <FilterBar filters={filters} onFilterChange={setFilters} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-3">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Analyzing inbox...</p>
              </div>
            ) : filteredEmails.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4 text-center p-8">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-medium">All caught up!</h3>
                  <p className="text-gray-500 text-sm mt-1">No pending emails match your filters.</p>
                </div>
                <button 
                  onClick={() => setFilters({category: 'All', priority: 'All'})}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <EmailTable emails={filteredEmails} onResolve={handleResolve} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;