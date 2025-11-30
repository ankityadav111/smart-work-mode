import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { AppState, Contact, RingerMode, Schedule } from '../types';
import { INITIAL_SCHEDULE, MOCK_CONTACTS } from '../constants';

interface ServiceContextType extends AppState {
  toggleWorkMode: () => void;
  updateSchedule: (schedule: Schedule) => void;
  toggleVip: (id: string) => void;
  grantPermissions: () => void;
  simulateIncomingCall: (contact: Contact) => void;
  endCall: () => void;
  acceptCall: () => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [workModeEnabled, setWorkModeEnabled] = useState(true);
  const [ringerMode, setRingerMode] = useState<RingerMode>('GENERAL');
  const [schedule, setSchedule] = useState<Schedule>(INITIAL_SCHEDULE);
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);
  const [callState, setCallState] = useState<AppState['callState']>({
    isActive: false,
    caller: null,
    status: 'IDLE',
  });
  const [logs, setLogs] = useState<string[]>([]);
  
  // Refs for logic that needs current state inside intervals/timeouts
  const stateRef = useRef({ workModeEnabled, schedule, ringerMode, callState });

  // Keep refs synced
  useEffect(() => {
    stateRef.current = { workModeEnabled, schedule, ringerMode, callState };
  }, [workModeEnabled, schedule, ringerMode, callState]);

  const addLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 50));
  }, []);

  // --- LOGIC ENGINE ---

  // 1. Check Schedule (The "WorkManager" periodic task)
  const checkTimeAndApplyMode = useCallback(() => {
    const { workModeEnabled, schedule, callState, ringerMode } = stateRef.current;

    if (!workModeEnabled || !permissionsGranted) return;
    if (callState.isActive) return; // Don't change mode during a call via schedule

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const currentDay = now.getDay();

    const [startH, startM] = schedule.startTime.split(':').map(Number);
    const [endH, endM] = schedule.endTime.split(':').map(Number);
    
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    const isWorkDay = schedule.days.includes(currentDay);
    const isWorkTime = currentMinutes >= startMinutes && currentMinutes < endMinutes;

    if (schedule.enabled && isWorkDay && isWorkTime) {
      if (ringerMode !== 'SILENT') {
        setRingerMode('SILENT');
        addLog('Work Schedule Active: Switched to SILENT');
      }
    } else {
      // Logic for "Outside Work Hours" - revert to General if not manually set?
      // For this app, let's assume we revert to General if we were in Silent due to work
      if (ringerMode === 'SILENT') {
         // In a real app we'd store the "previous" mode. Simple assumption here:
         setRingerMode('GENERAL');
         addLog('Work Schedule Ended: Switched to GENERAL');
      }
    }
  }, [permissionsGranted]);

  // Run the scheduler ticker
  useEffect(() => {
    const interval = setInterval(checkTimeAndApplyMode, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [checkTimeAndApplyMode]);


  // 2. Incoming Call Logic (PhoneStateListener)
  const simulateIncomingCall = (caller: Contact) => {
    if (!permissionsGranted) return;

    addLog(`Incoming call from ${caller.name} (${caller.phoneNumber})`);
    
    setCallState({
      isActive: true,
      caller,
      status: 'INCOMING',
    });

    // Check VIP Rule
    const { ringerMode } = stateRef.current;
    
    if (ringerMode === 'SILENT') {
      if (caller.isVip) {
        setRingerMode('GENERAL');
        addLog(`VIP DETECTED: Overriding Silent Mode -> GENERAL (Volume 50%)`);
      } else {
        addLog(`Call blocked/silenced (Not VIP)`);
      }
    } else {
        addLog('Phone is already in General mode, ringing normally.');
    }
  };

  const acceptCall = () => {
    setCallState(prev => ({ ...prev, status: 'CONNECTED' }));
    addLog('Call Answered');
  };

  const endCall = () => {
    const { callState, schedule } = stateRef.current;
    
    setCallState({ isActive: false, caller: null, status: 'ENDED' });
    setTimeout(() => setCallState({ isActive: false, caller: null, status: 'IDLE' }), 1000);

    addLog('Call Ended');

    // 3. Post-Call Logic (Revert to Silent if needed)
    // Re-run the schedule check immediately
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [startH, startM] = schedule.startTime.split(':').map(Number);
    const [endH, endM] = schedule.endTime.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    const isWorkTime = currentMinutes >= startMinutes && currentMinutes < endMinutes;

    if (workModeEnabled && isWorkTime) {
        setRingerMode('SILENT');
        addLog('Work hours still active: Reverting to SILENT');
    }
  };

  // --- ACTIONS ---

  const toggleWorkMode = () => {
    setWorkModeEnabled(prev => {
      const next = !prev;
      addLog(`Manual Toggle: Work Mode ${next ? 'ON' : 'OFF'}`);
      if (!next) {
          setRingerMode('GENERAL'); // Reset if turned off manually
      }
      return next;
    });
  };

  const updateSchedule = (newSchedule: Schedule) => {
    setSchedule(newSchedule);
    addLog('Schedule updated');
  };

  const toggleVip = (id: string) => {
    setContacts(prev => prev.map(c => {
      if (c.id === id) {
        const newVal = !c.isVip;
        addLog(`${c.name} is now ${newVal ? 'VIP' : 'Standard'}`);
        return { ...c, isVip: newVal };
      }
      return c;
    }));
  };

  const grantPermissions = () => {
    setPermissionsGranted(true);
    addLog('Permissions: READ_CONTACTS, PHONE_STATE, DND_ACCESS Granted');
  };

  return (
    <ServiceContext.Provider value={{
      permissionsGranted,
      workModeEnabled,
      ringerMode,
      schedule,
      contacts,
      callState,
      logs,
      toggleWorkMode,
      updateSchedule,
      toggleVip,
      grantPermissions,
      simulateIncomingCall,
      endCall,
      acceptCall
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) throw new Error('useService must be used within ServiceProvider');
  return context;
};