import React from 'react';
import { EmailItem } from '../types';
import { Badge } from './Badge';
import { ArrowRight, Check, Building2, Calendar } from 'lucide-react';

interface EmailTableProps {
  emails: EmailItem[];
  onResolve: (id: string) => void;
}

export const EmailTable: React.FC<EmailTableProps> = ({ emails, onResolve }) => {
  return (
    <div>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Priority / Date</th>
              <th className="px-6 py-3">Subject & Summary</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Suggested Action</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {emails.map((email) => (
              <tr key={email.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 align-top">
                  <div className="flex flex-col space-y-2 items-start">
                    <Badge type="priority" value={email.priority} />
                    <span className="text-xs text-gray-400">
                      {new Date(email.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 align-top max-w-sm whitespace-normal">
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900 mb-0.5">{email.subject}</span>
                        <span className="text-gray-500 text-xs leading-relaxed line-clamp-2">{email.summary}</span>
                        {email.company && (
                            <div className="flex items-center mt-1.5 text-xs text-gray-400">
                                <Building2 size={10} className="mr-1" />
                                {email.company}
                            </div>
                        )}
                    </div>
                </td>
                <td className="px-6 py-4 align-top">
                  <Badge type="category" value={email.category} />
                </td>
                <td className="px-6 py-4 align-top max-w-xs whitespace-normal">
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-700 text-sm bg-blue-50/50 p-2 rounded-lg border border-blue-100/50">
                            {email.action}
                        </span>
                        <div className="flex justify-between items-center px-1">
                             <Badge type="confidence" value={email.confidence} />
                             {email.budget_estimate && <span className="text-xs text-green-600 font-medium">{email.budget_estimate}</span>}
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 align-top text-right">
                  <button
                    onClick={() => onResolve(email.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                    title="Mark as Resolved"
                  >
                    <Check size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-100">
        {emails.map((email) => (
          <div key={email.id} className="p-4 space-y-3 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start">
               <div className="flex flex-col gap-1">
                    <Badge type="priority" value={email.priority} />
                    <span className="text-xs text-gray-400 mt-1 flex items-center">
                        <Calendar size={10} className="mr-1" />
                        {new Date(email.date).toLocaleDateString()}
                    </span>
               </div>
               <Badge type="category" value={email.category} />
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900">{email.subject}</h3>
              <div className="flex items-center text-xs text-gray-500 mt-0.5 mb-2">
                 <Building2 size={12} className="mr-1" /> {email.from}
              </div>
              <p className="text-sm text-gray-600 leading-snug">{email.summary}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 text-sm border border-gray-100">
                <p className="font-medium text-gray-800 mb-1">AI Action:</p>
                <p className="text-gray-600 text-xs">{email.action}</p>
            </div>

            <div className="flex items-center justify-between pt-1">
                 <Badge type="confidence" value={email.confidence} />
                 <button
                    onClick={() => onResolve(email.id)}
                    className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Resolve <ArrowRight size={14} className="ml-1" />
                  </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};