import React from 'react';
import { useService } from '../context/ServiceContext';
import { DAYS_OF_WEEK } from '../constants';
import { Clock } from 'lucide-react';

export const ScheduleScreen = () => {
  const { schedule, updateSchedule } = useService();

  const toggleDay = (dayIndex: number) => {
    const newDays = schedule.days.includes(dayIndex)
        ? schedule.days.filter(d => d !== dayIndex)
        : [...schedule.days, dayIndex].sort();
    updateSchedule({ ...schedule, days: newDays });
  };

  const handleTimeChange = (type: 'start' | 'end', value: string) => {
      if (type === 'start') updateSchedule({ ...schedule, startTime: value });
      else updateSchedule({ ...schedule, endTime: value });
  };

  return (
    <div className="p-4 h-full bg-slate-50">
      <h1 className="text-xl font-bold text-slate-800 mb-6">Work Schedule</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-8">
        
        {/* Time Inputs */}
        <div className="flex items-center justify-between space-x-4">
            <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Start Time</label>
                <div className="relative bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <input 
                        type="time" 
                        value={schedule.startTime} 
                        onChange={(e) => handleTimeChange('start', e.target.value)}
                        className="bg-transparent w-full text-xl font-bold text-slate-800 outline-none" 
                    />
                </div>
            </div>
            <div className="text-slate-300 pt-6">→</div>
            <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">End Time</label>
                <div className="relative bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <input 
                        type="time" 
                        value={schedule.endTime} 
                        onChange={(e) => handleTimeChange('end', e.target.value)}
                        className="bg-transparent w-full text-xl font-bold text-slate-800 outline-none" 
                    />
                </div>
            </div>
        </div>

        {/* Days Selector */}
        <div>
            <label className="block text-xs font-semibold text-slate-400 mb-3 uppercase">Active Days</label>
            <div className="flex justify-between">
                {DAYS_OF_WEEK.map((day, index) => {
                    const isActive = schedule.days.includes(index);
                    return (
                        <button
                            key={index}
                            onClick={() => toggleDay(index)}
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                isActive 
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 rounded-xl p-4 flex items-start space-x-3">
            <Clock className="text-blue-500 mt-1" size={18} />
            <p className="text-xs text-blue-800 leading-relaxed">
                During these hours, your phone will automatically enter <strong>Silent Mode</strong> unless a <strong>VIP Contact</strong> calls you.
            </p>
        </div>
      </div>
    </div>
  );
};