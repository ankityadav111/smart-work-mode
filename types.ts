export type RingerMode = 'SILENT' | 'VIBRATE' | 'GENERAL';

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  isVip: boolean;
  avatarColor: string;
}

export interface Schedule {
  startTime: string; // Format "HH:mm"
  endTime: string;   // Format "HH:mm"
  enabled: boolean;
  days: number[]; // 0 = Sunday, 1 = Monday, etc.
}

export interface CallState {
  isActive: boolean;
  caller: Contact | null;
  status: 'INCOMING' | 'CONNECTED' | 'ENDED' | 'IDLE';
}

export interface AppState {
  permissionsGranted: boolean;
  workModeEnabled: boolean;
  ringerMode: RingerMode;
  schedule: Schedule;
  contacts: Contact[];
  callState: CallState;
  logs: string[]; // To show what the "Service" is doing
}