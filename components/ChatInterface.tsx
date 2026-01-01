import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'agent';
    text: string;
    timestamp: number;
}

interface ChatInterfaceProps {
    onClose: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'agent',
            text: "How can I help you today?",
            timestamp: Date.now()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const wsRef = useRef<WebSocket | null>(null);

    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);

    useEffect(() => {
        // Use environment variable for WebSocket URL, fallback to localhost for development
        const wsUrl = import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:8000/ws';
        console.log('Connecting to WebSocket:', wsUrl);

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('Connected');
            setIsConnected(true);
            setConnectionError(null);
        };

        ws.onclose = () => {
            console.log('Disconnected');
            setIsConnected(false);
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
            setConnectionError('Connection failed');
        };

        ws.onmessage = (event) => {
            const text = event.data;
            if (text === '<END_OF_TURN>') {
                setIsTyping(false);
                return;
            }

            setMessages(prev => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg.role === 'agent' && lastMsg.id === 'streaming-response') {
                    return [
                        ...prev.slice(0, -1),
                        { ...lastMsg, text: lastMsg.text + text }
                    ];
                } else {
                    return [
                        ...prev,
                        { id: 'streaming-response', role: 'agent', text: text, timestamp: Date.now() }
                    ];
                }
            });
        }

        wsRef.current = ws;
        return () => ws.close();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim() || !wsRef.current) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: inputValue,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        wsRef.current.send(inputValue);
        setInputValue('');
        setIsTyping(true);

        setMessages(prev => [...prev, {
            id: 'streaming-response',
            role: 'agent',
            text: '',
            timestamp: Date.now()
        }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed bottom-24 right-8 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] z-[60] flex flex-col font-sans shadow-2xl rounded-2xl overflow-hidden bg-[#111111] border border-white/10"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-medium text-white/90 tracking-tight">Agnometry</h2>
                    <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
                </div>
                <button
                    onClick={onClose}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#111111]">
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <div
                            className={`max-w-[90%] text-[13px] leading-relaxed ${msg.role === 'user'
                                ? 'text-white bg-white/10 px-4 py-2.5 rounded-2xl rounded-tr-sm'
                                : 'text-white/80 px-0 py-0'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </motion.div>
                ))}

                {isTyping && messages[messages.length - 1].text === '' && (
                    <div className="flex items-center gap-1 h-4 px-1">
                        <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#111111] border-t border-white/5">
                <div className="relative flex items-center bg-white/5 rounded-xl border border-white/5 focus-within:border-white/20 transition-colors">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask a question..."
                        className="w-full bg-transparent border-none text-white placeholder:text-white/20 focus:ring-0 p-3 text-[13px] resize-none h-[44px] max-h-[120px] custom-scrollbar leading-relaxed"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className="mr-2 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-0 transition-all"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
