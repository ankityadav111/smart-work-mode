import React from 'react';
import { useService } from '../context/ServiceContext';
import { Smartphone, Moon, Sun, Volume2, VolumeX, ShieldCheck, Activity } from 'lucide-react';
import { MOCK_CONTACTS } from '../constants';

export const HomeScreen = () => {
  const { 
    workModeEnabled, 
    toggleWorkMode, 
    ringerMode, 
    logs,
    contacts, 
    simulateIncomingCall 
  } = useService();

  return (
    <div className="p-4 space-y-6">
      <header className="mt-4">
        <h1 className="text-2xl font-bold text-slate-800">Smart Work Mode</h1>
        <p className="text-sm text-slate-500">Automated focus manager</p>
      </header>

      {/* Main Status Card */}
      <div className={`rounded-2xl p-6 text-white shadow-lg transition-colors duration-300 ${workModeEnabled ? 'bg-blue-600' : 'bg-slate-400'}`}>
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-lg font-semibold">{workModeEnabled ? 'Work Mode Active' : 'Work Mode Off'}</h2>
                <p className="text-blue-100 text-sm opacity-90">
                    {workModeEnabled ? 'Monitoring Schedule & Calls' : 'Automation Paused'}
                </p>
            </div>
            <div className="p-2 bg-white/20 rounded-full">
                {workModeEnabled ? <ShieldCheck size={24} /> : <Moon size={24} />}
            </div>
        </div>
        
        <div className="flex items-center space-x-3 mt-4">
            <span className="text-xs uppercase tracking-wider opacity-70">Current State</span>
            <div className="flex items-center space-x-2 bg-black/20 px-3 py-1 rounded-full text-sm font-medium">
                {ringerMode === 'SILENT' ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{ringerMode}</span>
            </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
            <span className="text-sm font-medium">Automation</span>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={workModeEnabled} onChange={toggleWorkMode} className="sr-only peer" />
                <div className="w-11 h-6 bg-blue-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/30"></div>
            </label>
        </div>
      </div>

      {/* Ringer Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
             <div className="text-slate-400 mb-2"><Volume2 size={20} /></div>
             <span className="text-xs text-slate-500">Normal Vol</span>
             <span className="text-lg font-bold text-slate-800">50%</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
             <div className="text-slate-400 mb-2"><VolumeX size={20} /></div>
             <span className="text-xs text-slate-500">Silent Vol</span>
             <span className="text-lg font-bold text-slate-800">0%</span>
        </div>
      </div>

      {/* Simulation Tools */}
      <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center space-x-2 mb-3 text-slate-600">
            <Activity size={16} />
            <h3 className="text-sm font-bold uppercase tracking-wide">Simulation Tools</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">Tap to trigger a fake call to test the logic.</p>
        <div className="grid grid-cols-2 gap-2">
            <button 
                onClick={() => simulateIncomingCall(contacts[0])}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-blue-600 text-xs font-medium py-2 px-3 rounded-lg shadow-sm transition"
            >
                Call from Mom (VIP)
            </button>
            <button 
                onClick={() => simulateIncomingCall(contacts[2])}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium py-2 px-3 rounded-lg shadow-sm transition"
            >
                Call from Boss
            </button>
        </div>
      </div>

      {/* Logs Console */}
      <div className="bg-black rounded-xl p-4 text-green-400 font-mono text-xs overflow-hidden h-48 flex flex-col">
        <div className="mb-2 uppercase text-gray-500 font-bold text-[10px]">System Service Logs</div>
        <div className="flex-1 overflow-y-auto space-y-1">
            {logs.length === 0 && <span className="opacity-50">Service waiting...</span>}
            {logs.map((log, i) => (
                <div key={i} className="border-l-2 border-green-700 pl-2">{log}</div>
            ))}
        </div>
      </div>
    </div>
  );
};