import React, { useState } from 'react';
import { ServiceProvider, useService } from './context/ServiceContext';
import { Layout } from './components/Layout';
import { HomeScreen } from './screens/HomeScreen';
import { VIPScreen } from './screens/VIPScreen';
import { ScheduleScreen } from './screens/ScheduleScreen';
import { PermissionsScreen } from './screens/PermissionsScreen';
import { GuideScreen } from './screens/GuideScreen';
import { IncomingCallOverlay } from './components/IncomingCallOverlay';

const AppContent = () => {
  const { permissionsGranted } = useService();
  const [activeTab, setActiveTab] = useState('home');

  if (!permissionsGranted) {
      return (
          <Layout activeTab={activeTab} onTabChange={setActiveTab}>
              <PermissionsScreen />
          </Layout>
      );
  }

  const renderScreen = () => {
    switch (activeTab) {
        case 'home': return <HomeScreen />;
        case 'vip': return <VIPScreen />;
        case 'schedule': return <ScheduleScreen />;
        case 'guide': return <GuideScreen />;
        default: return <HomeScreen />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderScreen()}
        <IncomingCallOverlay />
    </Layout>
  );
};

export default function App() {
  return (
    <ServiceProvider>
      <AppContent />
    </ServiceProvider>
  );
}