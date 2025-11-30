import React from 'react';
import { useService } from '../context/ServiceContext';
import { Star, User, Search, UserPlus } from 'lucide-react';

export const VIPScreen = () => {
  const { contacts, toggleVip } = useService();

  const sortedContacts = [...contacts].sort((a, b) => {
      // VIPs first
      if (a.isVip && !b.isVip) return -1;
      if (!a.isVip && b.isVip) return 1;
      return 0;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white shadow-sm z-10 sticky top-0">
          <h1 className="text-xl font-bold text-slate-800 mb-1">VIP Contacts</h1>
          <p className="text-xs text-slate-500 mb-4">Calls from these numbers will override Silent mode to General.</p>
          
          <div className="relative">
            <input 
                type="text" 
                placeholder="Search name or number..." 
                className="w-full bg-slate-100 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 pb-20">
        
        {/* Native Picker Simulation */}
        <div className="mb-4 px-1">
            <button className="w-full flex items-center justify-center space-x-2 bg-blue-50 border border-blue-200 border-dashed rounded-xl py-3 text-blue-600 font-medium hover:bg-blue-100 transition-colors">
                <UserPlus size={18} />
                <span className="text-sm">Select from Device Contacts</span>
            </button>
        </div>

        {sortedContacts.map((contact) => (
            <div 
                key={contact.id} 
                onClick={() => toggleVip(contact.id)}
                className={`flex items-center p-3 mb-2 rounded-xl transition-all cursor-pointer border ${contact.isVip ? 'bg-blue-50 border-blue-200' : 'bg-white border-transparent hover:border-slate-200'}`}
            >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${contact.avatarColor}`}>
                    {contact.name.charAt(0)}
                </div>
                
                <div className="ml-3 flex-1">
                    <h3 className={`text-sm font-semibold ${contact.isVip ? 'text-blue-900' : 'text-slate-700'}`}>{contact.name}</h3>
                    <p className="text-xs text-slate-400">{contact.phoneNumber}</p>
                </div>

                <div className={`p-2 rounded-full transition-colors ${contact.isVip ? 'text-yellow-500 bg-yellow-100' : 'text-slate-300'}`}>
                    <Star size={20} fill={contact.isVip ? "currentColor" : "none"} />
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};