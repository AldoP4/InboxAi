import React from 'react';
import { EmailItem } from '../types';
import { AlertTriangle, Clock, Briefcase, Check } from 'lucide-react';

interface UrgentSectionProps {
  emails: EmailItem[];
  onResolve: (id: string) => void;
}

export const UrgentSection: React.FC<UrgentSectionProps> = ({ emails, onResolve }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {emails.map((email) => (
        <div 
          key={email.id} 
          className="group relative bg-white rounded-xl p-5 shadow-sm border border-red-100 hover:shadow-md transition-all duration-200"
        >
          {/* Top colored line */}
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-l-xl opacity-80" />
          
          <div className="pl-2 space-y-3">
            <div className="flex justify-between items-start">
              <span className="inline-flex items-center text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded">
                <AlertTriangle size={12} className="mr-1" /> Urgent
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {new Date(email.date).toLocaleDateString()}
              </span>
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                {email.subject}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {email.summary}
              </p>
            </div>

            {/* AI Insight Box */}
            <div className="bg-gray-50 rounded-lg p-3 text-xs border border-gray-100">
                <div className="flex items-start gap-2">
                    <span className="font-semibold text-gray-700 whitespace-nowrap">Recommended Action:</span>
                    <span className="text-gray-600">{email.action}</span>
                </div>
                {email.deadline && (
                    <div className="flex items-center gap-1.5 mt-2 text-red-600 font-medium">
                        <Clock size={12} />
                        <span>Deadline: {email.deadline}</span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                <div className="flex items-center text-xs text-gray-500">
                    <Briefcase size={12} className="mr-1.5" />
                    <span className="truncate max-w-[100px]">{email.company || email.from}</span>
                </div>
                
                <button
                    onClick={() => onResolve(email.id)}
                    className="flex items-center px-3 py-1.5 bg-white border border-gray-200 hover:border-green-500 hover:bg-green-50 hover:text-green-600 text-gray-600 text-xs font-medium rounded-lg transition-all shadow-sm"
                >
                    <Check size={14} className="mr-1.5" />
                    Mark Resolved
                </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};