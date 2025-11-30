import { Contact, Schedule } from './types';

export const INITIAL_SCHEDULE: Schedule = {
  startTime: '09:00',
  endTime: '17:00',
  enabled: true,
  days: [1, 2, 3, 4, 5], // Mon-Fri
};

export const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Mom', phoneNumber: '+1 555-0101', isVip: true, avatarColor: 'bg-pink-500' },
  { id: '2', name: 'Dad', phoneNumber: '+1 555-0102', isVip: true, avatarColor: 'bg-blue-500' },
  { id: '3', name: 'Boss', phoneNumber: '+1 555-0103', isVip: false, avatarColor: 'bg-red-600' },
  { id: '4', name: 'Spam Caller', phoneNumber: '+1 555-9999', isVip: false, avatarColor: 'bg-gray-500' },
  { id: '5', name: 'Alice (Friend)', phoneNumber: '+1 555-0202', isVip: false, avatarColor: 'bg-purple-500' },
];

export const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
