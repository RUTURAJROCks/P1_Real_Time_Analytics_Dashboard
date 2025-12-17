import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dark Mode Context
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        playClickSound();
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Sound Effect Utility
const playClickSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.1;

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
    oscillator.stop(audioContext.currentTime + 0.1);
};

const playSliderSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 400;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.05;

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
    oscillator.stop(audioContext.currentTime + 0.05);
};

// API URL - uses environment variable in production, localhost in development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function MetricsDashboard() {
    const { isDark, toggleTheme } = useTheme();
    const [data, setData] = useState([]);
    const [stats, setStats] = useState({ max: 0, min: 0, avg: 0 });
    const [timeRange, setTimeRange] = useState(5); // 5 minutes default
    const [isConnected, setIsConnected] = useState(true);

    const handleSliderChange = useCallback((e) => {
        const newValue = parseInt(e.target.value);
        setTimeRange(newValue);
        playSliderSound();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timeInSeconds = timeRange * 60;
                const response = await fetch(
                    `${API_URL}/api/metrics?metric=cpu&start=${timeInSeconds}&end=0`
                );
                const result = await response.json();
                setStats(result);
                setIsConnected(true);

                const latestResponse = await fetch(`${API_URL}/api/metrics?metric=cpu&start=1&end=0`);
                const latestResult = await latestResponse.json();

                setData(prevData => {
                    const newData = [...prevData, {
                        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                        cpu: latestResult.avg
                    }];
                    if (newData.length > 60) newData.shift();
                    return newData;
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsConnected(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, [timeRange]);

    // Theme classes
    const bgClass = isDark ? 'bg-gray-900' : 'bg-gray-50';
    const cardClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200 shadow-sm';
    const textClass = isDark ? 'text-white' : 'text-gray-900';
    const textMutedClass = isDark ? 'text-gray-400' : 'text-gray-500';
    const gridColor = isDark ? '#374151' : '#E5E7EB';

    return (
        <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
            {/* Header */}
            <header className={`${cardClass} border-b px-6 py-4 sticky top-0 z-10`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl">📊</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Segment Tree Analytics</h1>
                            <p className={`text-sm ${textMutedClass}`}>Real-time metrics dashboard</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Connection Status */}
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${isConnected
                            ? (isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700')
                            : (isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700')
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
                            {isConnected ? 'Connected' : 'Disconnected'}
                        </div>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg transition-all ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Left Sidebar - Controls */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Time Range Slider */}
                        <div className={`${cardClass} rounded-xl p-6 border`}>
                            <h2 className="text-lg font-semibold mb-4">Time Range</h2>

                            <div className="space-y-4">
                                <div className="text-center">
                                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                        {timeRange}
                                    </span>
                                    <span className={`text-lg ${textMutedClass}`}> min</span>
                                </div>

                                <input
                                    type="range"
                                    min="1"
                                    max="60"
                                    value={timeRange}
                                    onChange={handleSliderChange}
                                    className="w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                                    style={{
                                        background: `linear-gradient(to right, #3B82F6 0%, #8B5CF6 ${(timeRange / 60) * 100}%, ${isDark ? '#374151' : '#E5E7EB'} ${(timeRange / 60) * 100}%, ${isDark ? '#374151' : '#E5E7EB'} 100%)`
                                    }}
                                />

                                <div className={`flex justify-between text-xs ${textMutedClass}`}>
                                    <span>1 min</span>
                                    <span>30 min</span>
                                    <span>60 min</span>
                                </div>
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className={`${cardClass} rounded-xl p-6 border`}>
                            <h2 className="text-lg font-semibold mb-4">Statistics</h2>
                            <div className="space-y-3">
                                <StatCard
                                    label="Max CPU"
                                    value={stats.max?.toFixed(1)}
                                    unit="%"
                                    color="text-red-500"
                                    isDark={isDark}
                                />
                                <StatCard
                                    label="Min CPU"
                                    value={stats.min?.toFixed(1)}
                                    unit="%"
                                    color="text-green-500"
                                    isDark={isDark}
                                />
                                <StatCard
                                    label="Avg CPU"
                                    value={stats.avg?.toFixed(1)}
                                    unit="%"
                                    color="text-blue-500"
                                    isDark={isDark}
                                />
                            </div>
                        </div>

                        {/* Performance Info */}
                        <div className={`${cardClass} rounded-xl p-6 border`}>
                            <h2 className="text-lg font-semibold mb-3">Performance</h2>
                            <div className={`text-sm ${textMutedClass} space-y-2`}>
                                <p>✨ Range queries: <span className="font-mono text-blue-500">O(log n)</span></p>
                                <p>📊 Data points: <span className="font-mono">3,600</span></p>
                                <p>⚡ Query time: <span className="font-mono text-green-500">~12 ops</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Main Chart */}
                    <div className={`lg:col-span-3 ${cardClass} rounded-xl p-6 border`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-semibold">CPU Usage</h2>
                                <p className={`text-sm ${textMutedClass}`}>Real-time monitoring over last {timeRange} minute{timeRange > 1 ? 's' : ''}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'
                                }`}>
                                LIVE
                            </div>
                        </div>

                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                    <XAxis
                                        dataKey="time"
                                        stroke={isDark ? '#9CA3AF' : '#6B7280'}
                                        tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                                        tickLine={{ stroke: isDark ? '#9CA3AF' : '#6B7280' }}
                                    />
                                    <YAxis
                                        domain={[0, 100]}
                                        stroke={isDark ? '#9CA3AF' : '#6B7280'}
                                        tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                                        tickLine={{ stroke: isDark ? '#9CA3AF' : '#6B7280' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                                            borderColor: isDark ? '#374151' : '#E5E7EB',
                                            color: isDark ? '#F3F4F6' : '#111827',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                        itemStyle={{ color: isDark ? '#F3F4F6' : '#111827' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="cpu"
                                        stroke="url(#gradient)"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6, fill: '#8B5CF6' }}
                                        isAnimationActive={false}
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#3B82F6" />
                                            <stop offset="100%" stopColor="#8B5CF6" />
                                        </linearGradient>
                                    </defs>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Stat Card Component
function StatCard({ label, value, unit, color, isDark }) {
    return (
        <div className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{label}</span>
            <span className={`text-xl font-mono font-bold ${color}`}>
                {value}{unit}
            </span>
        </div>
    );
}

export default MetricsDashboard;
