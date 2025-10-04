/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Input } from './input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeftCircleIcon } from 'lucide-react';
import ReactMarkdown from "react-markdown";


const AIAssistant = () => {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hello there, how can I help you?',
        },
    ]);
    const [loading, setLoading] = useState(false);
    const removeMarkdown = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/_(.*?)_/g, '$1')
            .replace(/\*(.*?)\*/g, '$1')
            .replace(/`(.*?)`/g, '$1')
            .replace(/#+\s/g, '');
    };

    const extractKeywords = (text) => {
        const stopWords = ['i', 'want', 'to', 'learn', 'any', 'courses', 'on', 'about', 'the', 'is', 'a', 'for', 'are', 'there', 'do', 'have', 'you'];
        return text
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .split(' ')
            .filter(word => word && !stopWords.includes(word));
    };


    const handleSend = async () => {
        if (!prompt) return;

        const newMessage = { role: 'user', content: prompt };
        setMessages((prev) => [...prev, newMessage]);
        setPrompt('');
        setLoading(true);

        try {
            const keywords = extractKeywords(prompt);

            if (keywords.length > 0) {
                const res = await axios.get(`http://localhost:8080/api/v1/course/search?query=${keywords[0]}`);
                const courses = res.data?.courses || [];

                if (courses.length > 0) {
                    const courseTitles = courses.map(c => `• ${c.courseTitle}`).join('\n');
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: 'assistant',
                            content: `Yes! We have the following courses for "${keywords[0]}":\n${courseTitles}`,
                        },
                    ]);
                } else {
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: 'assistant',
                            content: `Sorry, I couldn't find any published courses related to "${keywords[0]}".`,
                        },
                    ]);
                }
            } else {
                const res = await axios.post('http://localhost:8080/api/v1/ai/chat', { prompt });
                const plainText = removeMarkdown(res.data.reply || "Sorry, I couldn't understand.");
                setMessages((prev) => [...prev, { role: 'assistant', content: plainText }]);
            }
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, {
                role: 'assistant',
                content: `Oops! Something went wrong. Please try again.`,
            }]);
        } finally {
            setLoading(false);
        }
    };




    const handleClear = () => {
        setMessages([
            {
                role: 'assistant',
                content: 'Hello there, how can I help you?',
            },
        ]);
    };

    return (
        <div>
            {/* Floating Chat Button */}
            <Button
                onClick={() => setOpen(!open)}
                className="fixed bottom-5 right-5 bg-blue-600 text-white w-14 h-14 text-2xl rounded-full flex items-center justify-center shadow-lg z-50"
            >
                💬
            </Button>

            {/* Chat Window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-24 right-5 w-80 max-h-[500px] bg-gray-100 rounded-2xl shadow-xl flex flex-col z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-blue-700 text-white px-4 py-3 rounded-t-2xl">
                            <button className="text-white text-xl" onClick={() => setOpen(false)}>
                                <ArrowLeftCircleIcon />
                            </button>
                            <h2 className="text-lg font-semibold">Robbie</h2>
                            <button className="text-white text-xl">
                                <Avatar>
                                    <AvatarImage
                                        src={"https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?semt=ais_hybrid&w=740"}
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </button>
                        </div>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 dark:bg-gray-800">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`px-4 py-2 max-w-[75%] rounded-2xl text-sm shadow-sm ${msg.role === 'user'
                                        ? 'bg-blue-500 text-white self-end rounded-br-none'
                                        : 'bg-white text-gray-800 self-start rounded-bl-none'
                                        } `}
                                >
                                    {msg.role === "assistant" ? (
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    ) : (
                                        msg.content
                                    )}

                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {loading && (
                                <div className="flex space-x-1 self-start p-2">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="flex items-center p-2 dark:bg-gray-800">
                            <Input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                className="flex-1 rounded-full px-4 py-2 border border-gray-300 text-sm dark:bg-white dark:text-black"
                            />
                            <Button
                                onClick={handleSend}
                                disabled={!prompt}
                                className="ml-2 bg-blue-600 text-white rounded-full p-2 w-9 h-9 flex items-center justify-center disabled:opacity-50"
                            >
                                ➤
                            </Button>
                        </div>

                        {/* Clear Chat */}
                        <div className="flex justify-center p-3 dark:bg-gray-800">
                            <Button
                                onClick={handleClear}
                                className="text-xs text-gray-500 hover:text-white bg-white hover:bg-gray-500 w-full"
                            >
                                Clear Chat
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIAssistant;
