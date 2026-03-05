import React from 'react';
import { FileText, Clock, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

const FilingCard = ({ title, filingType, period, status, progress, priority }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Complete': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'In Progress': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            case 'Needs Review': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
            case 'Drafting': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 mb-4 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group cursor-pointer">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="text-white font-semibold text-lg group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{title}</h4>
                    <p className="text-gray-400 text-xs font-medium">{period}</p>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(status)} uppercase`}>
                    {status}
                </div>
            </div>

            {progress !== undefined && (
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-gray-500 text-[10px] font-bold uppercase">Drafting Progress</span>
                        <span className="text-emerald-400 text-[10px] font-bold">{progress}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                        <div
                            className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                <div className="flex items-center text-gray-400">
                    <Clock className="w-3.5 h-3.5 mr-1.5 opacity-50" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Last updated 2h ago</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-0.5" />
            </div>
        </div>
    );
};

export default FilingCard;
