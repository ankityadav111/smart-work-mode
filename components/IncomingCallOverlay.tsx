import React from 'react';
import { useService } from '../context/ServiceContext';
import { Phone, PhoneOff, Star } from 'lucide-react';

export const IncomingCallOverlay = () => {
    const { callState, acceptCall, endCall } = useService();
    
    if (!callState.isActive) return null;

    const isIncoming = callState.status === 'INCOMING';

    return (
        <div className="absolute inset-0 bg-slate-900 z-50 flex flex-col items-center justify-between py-12 text-white animate-in fade-in duration-300">
            <div className="flex flex-col items-center mt-8">
                {callState.caller?.isVip && (
                    <div className="flex items-center space-x-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold mb-4 border border-yellow-500/50">
                        <Star size={12} fill="currentColor" />
                        <span>VIP CALLER</span>
                    </div>
                )}
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold mb-4 shadow-2xl ${callState.caller?.avatarColor}`}>
                    {callState.caller?.name.charAt(0)}
                </div>
                <h2 className="text-3xl font-light">{callState.caller?.name}</h2>
                <p className="text-slate-400 mt-1">{isIncoming ? 'Incoming Call...' : '00:14'}</p>
            </div>

            <div className="w-full px-12 flex justify-between items-center mb-8">
                {isIncoming ? (
                    <>
                         <button 
                            onClick={endCall}
                            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 active:scale-95 transition-all"
                         >
                            <PhoneOff size={32} />
                        </button>
                        <button 
                            onClick={acceptCall}
                            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 active:scale-95 transition-all animate-bounce"
                        >
                            <Phone size={32} />
                        </button>
                    </>
                ) : (
                    <div className="w-full flex justify-center">
                        <button 
                            onClick={endCall}
                            className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 active:scale-95 transition-all"
                         >
                            <PhoneOff size={36} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};