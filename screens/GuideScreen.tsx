import React, { useState } from 'react';
import { Smartphone, Code, Play, Shield, Terminal, FileJson, Layers, Copy, Check } from 'lucide-react';

export const GuideScreen = () => {
  const [activeTab, setActiveTab] = useState<'steps' | 'native' | 'manifest'>('steps');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const CodeBlock = ({ code, language, id }: { code: string, language: string, id: string }) => (
    <div className="relative group mt-2">
      <div className="absolute right-2 top-2">
        <button 
          onClick={() => handleCopy(code, id)}
          className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-slate-300 transition-colors"
        >
          {copied === id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="bg-slate-900 text-slate-300 p-4 rounded-xl text-[10px] font-mono overflow-x-auto border border-slate-800 leading-relaxed whitespace-pre">
        {code}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <header className="p-4 bg-white border-b border-slate-200 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-slate-800">APK Build Studio</h1>
        <p className="text-xs text-slate-500 mb-4">Export source code for Android Studio.</p>
        
        <div className="flex p-1 bg-slate-100 rounded-lg">
            <button 
                onClick={() => setActiveTab('steps')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'steps' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
                Steps
            </button>
            <button 
                onClick={() => setActiveTab('native')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'native' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
                Java Module
            </button>
            <button 
                onClick={() => setActiveTab('manifest')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'manifest' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
                Manifest
            </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-6">
        
        {activeTab === 'steps' && (
            <>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center space-x-2 mb-2">
                        <Terminal className="text-slate-700" size={18} />
                        <h3 className="font-bold text-slate-800 text-sm">1. Initialize Project</h3>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">Run these commands in your terminal to create the React Native project.</p>
                    <CodeBlock 
                        id="init-cmd"
                        language="bash" 
                        code={`npx react-native@latest init SmartWorkMode
cd SmartWorkMode
npm install @react-native-async-storage/async-storage react-native-background-actions`} 
                    />
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center space-x-2 mb-2">
                        <Play className="text-green-600" size={18} />
                        <h3 className="font-bold text-slate-800 text-sm">2. Build APK</h3>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">Generate the signed APK for installation.</p>
                    <CodeBlock 
                        id="build-cmd"
                        language="bash" 
                        code={`cd android
./gradlew assembleRelease`} 
                    />
                    <p className="text-[10px] text-slate-400 mt-2 italic">Output: android/app/build/outputs/apk/release/app-release.apk</p>
                </div>
            </>
        )}

        {activeTab === 'native' && (
            <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
                    <p className="text-xs text-blue-800">
                        <strong>Critical:</strong> To actually control Silent Mode, you need this Native Module. Create this file at:
                        <br/><span className="font-mono text-[10px]">android/app/src/main/java/com/smartworkmode/SilentModeModule.java</span>
                    </p>
                </div>

                <CodeBlock 
                    id="java-code"
                    language="java"
                    code={`package com.smartworkmode;

import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SilentModeModule extends ReactContextBaseJavaModule {
    private final NotificationManager notificationManager;

    public SilentModeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        notificationManager = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);
    }

    @Override
    public String getName() {
        return "SilentMode";
    }

    @ReactMethod
    public void setSilent() {
        if (notificationManager.isNotificationPolicyAccessGranted()) {
            notificationManager.setInterruptionFilter(NotificationManager.INTERRUPTION_FILTER_NONE);
        }
    }

    @ReactMethod
    public void setNormal() {
        if (notificationManager.isNotificationPolicyAccessGranted()) {
            notificationManager.setInterruptionFilter(NotificationManager.INTERRUPTION_FILTER_ALL);
        }
    }
    
    @ReactMethod
    public void openDNDSettings() {
        Intent intent = new Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getReactApplicationContext().startActivity(intent);
    }
}`} 
                />
            </div>
        )}

        {activeTab === 'manifest' && (
             <div className="space-y-4">
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 mb-2">
                    <p className="text-xs text-orange-800">
                        Add these permissions to <span className="font-mono text-[10px]">android/app/src/main/AndroidManifest.xml</span> inside the <code>&lt;manifest&gt;</code> tag.
                    </p>
                </div>

                <CodeBlock 
                    id="manifest-code"
                    language="xml"
                    code={`<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="com.smartworkmode">

    <!-- REQUIRED FOR SILENT MODE -->
    <uses-permission android:name="android.permission.ACCESS_NOTIFICATION_POLICY" />
    
    <!-- REQUIRED FOR CALL DETECTION -->
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.READ_CALL_LOG" />
    
    <!-- REQUIRED FOR CONTACTS -->
    <uses-permission android:name="android.permission.READ_CONTACTS" />

    <!-- REQUIRED FOR BACKGROUND SERVICE -->
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <application ... >
       ...
    </application>
</manifest>`} 
                />
            </div>
        )}

      </div>
    </div>
  );
};