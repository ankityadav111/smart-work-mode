import React from 'react';
import { useService } from '../context/ServiceContext';
import { Bell, BellOff, Volume2, Battery, Wifi, Signal } from 'lucide-react';

interface LayoutProps {
  activeTab: string;
  onTabChange: (t: string) => void;
  children?: React.ReactNode;
}

const StatusBar = () => {
    const { ringerMode } = useService();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="h-8 bg-slate-900 text-white flex justify-between items-center px-4 text-xs font-medium select-none">
            <span>{time}</span>
            <div className="flex items-center space-x-2">
                {ringerMode === 'SILENT' && <BellOff size={12} />}
                {ringerMode === 'GENERAL' && <Volume2 size={12} />}
                <Wifi size={14} />
                <Signal size={14} />
                <Battery size={14} />
            </div>
        </div>
    );
};

const NavigationBar = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (t: string) => void }) => {
    return (
        <div className="h-16 bg-slate-900 border-t border-slate-800 flex justify-around items-center absolute bottom-0 w-full z-40">
            <button 
                onClick={() => onTabChange('home')}
                className={`flex flex-col items-center p-2 w-16 ${activeTab === 'home' ? 'text-blue-400' : 'text-slate-400'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span className="text-[10px] mt-1">Home</span>
            </button>
            <button 
                onClick={() => onTabChange('vip')}
                className={`flex flex-col items-center p-2 w-16 ${activeTab === 'vip' ? 'text-blue-400' : 'text-slate-400'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span className="text-[10px] mt-1">VIPs</span>
            </button>
            <button 
                onClick={() => onTabChange('schedule')}
                className={`flex flex-col items-center p-2 w-16 ${activeTab === 'schedule' ? 'text-blue-400' : 'text-slate-400'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span className="text-[10px] mt-1">Schedule</span>
            </button>
            <button 
                onClick={() => onTabChange('guide')}
                className={`flex flex-col items-center p-2 w-16 ${activeTab === 'guide' ? 'text-blue-400' : 'text-slate-400'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                <span className="text-[10px] mt-1">Build</span>
            </button>
        </div>
    );
};

export const Layout = ({ activeTab, onTabChange, children }: LayoutProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4 font-sans">
        {/* Phone Frame */}
        <div className="relative w-[360px] h-[740px] bg-black rounded-[3rem] shadow-2xl border-4 border-slate-700 overflow-hidden flex flex-col">
            {/* Notch area (visual only) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50"></div>
            
            <StatusBar />
            
            <main className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto pb-20 relative">
                {children}
            </main>

            <NavigationBar activeTab={activeTab} onTabChange={onTabChange} />
        </div>
    </div>
  );
};