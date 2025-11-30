import React from 'react';
import { useService } from '../context/ServiceContext';
import { Shield, Check, Phone, Bell } from 'lucide-react';

export const PermissionsScreen = () => {
  const { grantPermissions } = useService();

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Shield className="text-blue-600" size={40} />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Permissions Required</h1>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            To automate your work mode effectively, Smart Work Mode needs access to a few system settings.
        </p>

        <div className="w-full space-y-4 mb-8">
            <div className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                    <Phone size={18} className="text-green-500" />
                </div>
                <div className="text-left flex-1">
                    <h3 className="text-sm font-bold text-slate-800">Phone State</h3>
                    <p className="text-xs text-slate-400">To detect incoming calls.</p>
                </div>
                <Check size={16} className="text-slate-300" />
            </div>

            <div className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                    <Bell size={18} className="text-orange-500" />
                </div>
                <div className="text-left flex-1">
                    <h3 className="text-sm font-bold text-slate-800">Do Not Disturb</h3>
                    <p className="text-xs text-slate-400">To change ringer mode.</p>
                </div>
                <Check size={16} className="text-slate-300" />
            </div>
        </div>

        <button 
            onClick={grantPermissions}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition-transform"
        >
            Grant Permissions
        </button>
    </div>
  );
};