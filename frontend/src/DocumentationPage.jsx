import React from 'react';
import { useTheme } from './MetricsDashboard';

function DocumentationPage({ onBack }) {
    const { isDark, toggleTheme } = useTheme();

    const bgClass = isDark ? 'bg-gray-900' : 'bg-gray-50';
    const cardClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200 shadow-sm';
    const textClass = isDark ? 'text-white' : 'text-gray-900';
    const textMutedClass = isDark ? 'text-gray-400' : 'text-gray-600';
    const codeBlockClass = isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-200';

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

    const handleBack = () => {
        playClickSound();
        onBack();
    };

    return (
        <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
            {/* Header */}
            <header className={`${cardClass} border-b px-6 py-4 sticky top-0 z-10`}>
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBack}
                            className={`p-2 rounded-lg transition-all ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            ← Back
                        </button>
                        <div>
                            <h1 className="text-xl font-bold">Documentation</h1>
                            <p className={`text-sm ${textMutedClass}`}>Understanding Segment Trees</p>
                        </div>
                    </div>

                    <button
                        onClick={() => { playClickSound(); toggleTheme(); }}
                        className={`p-2 rounded-lg transition-all ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-6 space-y-8">

                {/* Introduction */}
                <section className={`${cardClass} rounded-xl p-8 border`}>
                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        What is a Segment Tree?
                    </h2>
                    <p className={`${textMutedClass} leading-relaxed`}>
                        A Segment Tree is a tree data structure used for storing information about intervals or segments.
                        It allows querying which of the stored segments contain a given point, and performing range queries
                        efficiently in <span className="font-mono text-blue-500">O(log n)</span> time.
                    </p>
                </section>

                {/* Visual Diagram */}
                <section className={`${cardClass} rounded-xl p-8 border`}>
                    <h2 className="text-xl font-bold mb-4">How It Works</h2>
                    <div className={`${codeBlockClass} rounded-lg p-6 border font-mono text-sm overflow-x-auto`}>
                        <pre className={textMutedClass}>{`
Array: [1, 3, 5, 7, 9, 11]

Segment Tree (Sum):
                    [36]              ← Sum of entire array
                   /    \\
              [9]        [27]         ← Sum of halves
             /   \\      /    \\
           [4]   [5]  [16]   [11]     ← Sum of quarters
          /  \\        /  \\
        [1] [3]     [7]  [9]          ← Leaf nodes = original array

Query(2, 4) = 5 + 7 + 9 = 21  ← Combine relevant nodes
                        `}</pre>
                    </div>
                </section>

                {/* Use in This Dashboard */}
                <section className={`${cardClass} rounded-xl p-8 border`}>
                    <h2 className="text-xl font-bold mb-4">How This Dashboard Uses Segment Trees</h2>
                    <div className="space-y-4">
                        <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'} border ${isDark ? 'border-blue-800' : 'border-blue-200'}`}>
                            <h3 className="font-semibold text-blue-500 mb-2">📊 Real-Time Metrics</h3>
                            <p className={textMutedClass}>
                                Every second, new CPU/Memory metrics are added to the data array.
                                The Segment Tree is updated in <span className="font-mono">O(log n)</span> time.
                            </p>
                        </div>

                        <div className={`p-4 rounded-lg ${isDark ? 'bg-purple-900/20' : 'bg-purple-50'} border ${isDark ? 'border-purple-800' : 'border-purple-200'}`}>
                            <h3 className="font-semibold text-purple-500 mb-2">⚡ Instant Range Queries</h3>
                            <p className={textMutedClass}>
                                When you adjust the time slider, the dashboard queries the Segment Tree for
                                <span className="font-mono"> sum</span>, <span className="font-mono">max</span>,
                                <span className="font-mono"> min</span>, and <span className="font-mono">avg</span>
                                — all in <span className="font-mono">O(log n)</span> time.
                            </p>
                        </div>

                        <div className={`p-4 rounded-lg ${isDark ? 'bg-green-900/20' : 'bg-green-50'} border ${isDark ? 'border-green-800' : 'border-green-200'}`}>
                            <h3 className="font-semibold text-green-500 mb-2">🚀 Performance Comparison</h3>
                            <table className="w-full text-sm mt-2">
                                <thead>
                                    <tr className={textMutedClass}>
                                        <th className="text-left p-2">Operation</th>
                                        <th className="text-left p-2">Naive Array</th>
                                        <th className="text-left p-2">Segment Tree</th>
                                    </tr>
                                </thead>
                                <tbody className="font-mono">
                                    <tr>
                                        <td className="p-2">Range Sum</td>
                                        <td className="p-2 text-red-500">O(n)</td>
                                        <td className="p-2 text-green-500">O(log n)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">Range Max/Min</td>
                                        <td className="p-2 text-red-500">O(n)</td>
                                        <td className="p-2 text-green-500">O(log n)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">Point Update</td>
                                        <td className="p-2 text-yellow-500">O(1)</td>
                                        <td className="p-2 text-green-500">O(log n)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Code Example */}
                <section className={`${cardClass} rounded-xl p-8 border`}>
                    <h2 className="text-xl font-bold mb-4">Core Implementation (Python)</h2>
                    <div className={`${codeBlockClass} rounded-lg p-4 border overflow-x-auto`}>
                        <pre className="text-sm"><code className={textMutedClass}>{`class SegmentTree:
    def __init__(self, data, merge_fn, identity):
        self.n = len(data)
        self.merge = merge_fn
        self.identity = identity
        self.tree = [identity] * (4 * self.n)
        self._build(data, 1, 0, self.n - 1)
    
    def query(self, l, r):
        """Range query in O(log n)"""
        return self._query(1, 0, self.n - 1, l, r)
    
    def update(self, idx, val):
        """Point update in O(log n)"""
        self._update(1, 0, self.n - 1, idx, val)

# Usage in MetricsEngine:
sum_tree = SegmentTree(data, lambda a, b: a + b, 0)
max_tree = SegmentTree(data, max, float('-inf'))
min_tree = SegmentTree(data, min, float('inf'))`}</code></pre>
                    </div>
                </section>

                {/* Real-World Applications */}
                <section className={`${cardClass} rounded-xl p-8 border`}>
                    <h2 className="text-xl font-bold mb-4">Real-World Applications</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { icon: '📈', title: 'Google Analytics', desc: 'Aggregating user metrics over time ranges' },
                            { icon: '💹', title: 'Bloomberg Terminal', desc: 'Computing stock statistics in real-time' },
                            { icon: '🎮', title: 'Gaming (Riot Games)', desc: 'Player ranking and leaderboard queries' },
                            { icon: '🛡️', title: 'Cloudflare', desc: 'DDoS detection via request counting' }
                        ].map((item, i) => (
                            <div key={i} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                <span className="text-2xl">{item.icon}</span>
                                <h3 className="font-semibold mt-2">{item.title}</h3>
                                <p className={`text-sm ${textMutedClass}`}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}

export default DocumentationPage;
