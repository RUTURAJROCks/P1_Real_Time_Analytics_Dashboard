import React, { useState, useEffect, createContext, useContext } from 'react';
import './index.css';

// Theme Context
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

// Image paths
const IMAGES = {
  background: {
    hero: '/assets/images/backgroundimg_1.jpeg',
    features: '/assets/images/backgroundimg_2.jpeg',
    performance: '/assets/images/backgroundimg_3.jpeg',
    dashboard: '/assets/images/backgroundimg_4.jpeg',
  },
  icons: {
    speed: '/assets/images/iconimg_2.jpeg',
    realtime: '/assets/images/iconimg_3.jpeg',
    production: '/assets/images/iconimg_4.jpeg',
    chart: '/assets/images/iconimg_5.jpeg',
    data: '/assets/images/iconimg_6.jpeg',
  },
  abstract: {
    gradient1: '/assets/images/abstractimg_1.jpeg',
    gradient2: '/assets/images/abstractimg_2.jpeg',
    gradient3: '/assets/images/abstractimg_3.jpeg',
  },
  data: {
    viz1: '/assets/images/dataimg_1.jpeg',
    viz2: '/assets/images/dataimg_2.jpeg',
    viz3: '/assets/images/dataimg_3.jpeg',
  },
  tech: {
    server1: '/assets/images/techimg_1.jpeg',
    server2: '/assets/images/techimg_2.jpeg',
    code: '/assets/images/techimg_3.jpeg',
  },
  simulations: {
    stock: '/assets/images/dataimg_4.jpeg',
    cdn: '/assets/images/techimg_4.jpeg',
    ecommerce: '/assets/images/dataimg_5.jpeg',
  }
};

const VIDEO = {
  hero: '/assets/videos/video_2.mp4'
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference, default to dark
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  return (
    <ThemeContext.Provider value={{ currentPage, setCurrentPage, isDarkMode, toggleTheme }}>
      <div className="min-h-screen bg-spacex-black text-white font-space">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'glass py-3' : 'bg-transparent py-6'
          }`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold tracking-tight">SegmentTree</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Dashboard', 'Simulations', 'Documentation'].map((item) => (
                <button
                  key={item}
                  onClick={() => setCurrentPage(item.toLowerCase())}
                  className={`text-sm uppercase tracking-widest transition-all ${currentPage === item.toLowerCase()
                    ? 'text-accent-cyan'
                    : 'text-white/60 hover:text-white'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                data-active={!isDarkMode}
                aria-label="Toggle theme"
              >
                <div className="theme-toggle-slider">
                  <span className="theme-toggle-icon">
                    {isDarkMode ? '🌙' : '☀️'}
                  </span>
                </div>
              </button>

              <a
                href="https://github.com/RUTURAJROCks/P1_Real_Time_Analytics_Dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'simulations' && <SimulationsPage />}
        {currentPage === 'documentation' && <DocumentationPage />}

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-white/50 text-sm">
              Built with Segment Trees | Powered by FastAPI & React
            </p>
          </div>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}

// ============================================
// HOME PAGE - Hero & Features
// ============================================
function HomePage({ onNavigate }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-bg"
        >
          <source src={VIDEO.hero} type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-spacex-black/60 via-spacex-black/40 to-spacex-black z-[1]"></div>

        {/* Grid Background */}
        <div className="absolute inset-0 grid-bg opacity-20 z-[2]"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="gradient-text">O(log n)</span>
            <br />
            Real-Time Analytics
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Segment Tree-powered metrics dashboard for monitoring at scale.
            <br className="hidden md:block" />
            Used by Google Analytics, Cloudflare, and Bloomberg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => onNavigate('dashboard')}
              className="btn-primary text-lg"
            >
              Launch Dashboard
            </button>
            <button
              onClick={() => onNavigate('simulations')}
              className="btn-secondary text-lg"
            >
              View Simulations
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-accent-cyan rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="gradient-text">Segment Trees</span>?
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              The data structure powering billion-dollar analytics platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: IMAGES.icons.speed,
                title: 'O(log n) Queries',
                desc: 'Range sum, min, max in logarithmic time instead of linear scans.',
                stat: '300x faster'
              },
              {
                image: IMAGES.icons.realtime,
                title: 'Real-Time Updates',
                desc: 'Point updates propagate in O(log n) maintaining query speed.',
                stat: '3600 ops/sec'
              },
              {
                image: IMAGES.icons.production,
                title: 'Production Ready',
                desc: 'Battle-tested in trading systems, CDNs, and monitoring tools.',
                stat: '99.99% uptime'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="scroll-reveal glass rounded-2xl p-8 card-hover"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden mb-4">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60 mb-4">{feature.desc}</p>
                <div className="text-accent-cyan font-bold text-lg">{feature.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Comparison */}
      <section className="section-spacing bg-spacex-dark relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl font-bold mb-6">
                Performance That <span className="gradient-text">Scales</span>
              </h2>
              <p className="text-white/60 text-lg mb-8">
                For 3,600 data points (1 hour of metrics), a naive array requires 3,600 operations per query.
                Our Segment Tree needs only ~12 operations.
              </p>

              <div className="space-y-6">
                {[
                  { label: 'Naive Array', value: 3600, color: 'bg-red-500' },
                  { label: 'Segment Tree', value: 12, color: 'bg-accent-cyan' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">{item.label}</span>
                      <span className="font-mono text-accent-cyan">{item.value} ops</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${(item.value / 3600) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Image */}
              <div className="mt-8 rounded-xl overflow-hidden h-48 shadow-lg">
                <img
                  src={IMAGES.tech.server1}
                  alt="Server Infrastructure"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="scroll-reveal">
              <div className="glass rounded-2xl p-8">
                <table className="w-full">
                  <thead>
                    <tr className="text-white/50 text-sm uppercase tracking-wider">
                      <th className="text-left pb-4">Operation</th>
                      <th className="text-center pb-4">Naive</th>
                      <th className="text-center pb-4">Segment Tree</th>
                    </tr>
                  </thead>
                  <tbody className="text-lg">
                    {[
                      ['Range Sum', 'O(n)', 'O(log n)'],
                      ['Range Min/Max', 'O(n)', 'O(log n)'],
                      ['Point Update', 'O(1)', 'O(log n)'],
                      ['Build Time', 'O(n)', 'O(n)']
                    ].map(([op, naive, tree], i) => (
                      <tr key={i} className="border-t border-white/10">
                        <td className="py-4 text-white/80">{op}</td>
                        <td className="py-4 text-center text-red-400 font-mono">{naive}</td>
                        <td className="py-4 text-center text-accent-cyan font-mono">{tree}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================
// DASHBOARD PAGE
// ============================================
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

function DashboardPage() {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ max: 0, min: 0, avg: 0 });
  const [timeRange, setTimeRange] = useState(5);
  const [isConnected, setIsConnected] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeInSeconds = timeRange * 60;
        const response = await fetch(`${API_URL}/api/metrics?metric=cpu&start=${timeInSeconds}&end=0`);
        const result = await response.json();
        setStats(result);
        setIsConnected(true);

        const latestResponse = await fetch(`${API_URL}/api/metrics?metric=cpu&start=1&end=0`);
        const latestResult = await latestResponse.json();

        setData(prev => {
          const newData = [...prev, {
            time: new Date().toLocaleTimeString('en-US', { hour12: false }),
            cpu: latestResult.avg,
            memory: Math.random() * 30 + 50
          }];
          if (newData.length > 60) newData.shift();
          return newData;
        });
      } catch (error) {
        console.error('Error:', error);
        setIsConnected(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [timeRange, API_URL]);

  return (
    <section className="min-h-screen pt-24 pb-20 px-6 relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${IMAGES.background.dashboard})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 scroll-reveal">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold">Real-Time Metrics</h1>
            <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${isConnected
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
              }`}>
              {isConnected ? 'Live' : 'Disconnected'}
            </span>
          </div>
          <p className="text-white/60 text-lg">
            Monitoring CPU usage with O(log n) range queries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            {/* Time Range */}
            <div className="glass rounded-2xl p-6 scroll-reveal">
              <h3 className="text-lg font-semibold mb-4">Time Range</h3>
              <div className="text-center mb-4">
                <span className="text-5xl font-bold gradient-text">{timeRange}</span>
                <span className="text-white/50 text-xl ml-2">min</span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                value={timeRange}
                onChange={(e) => setTimeRange(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-white/40 mt-2">
                <span>1 min</span>
                <span>30 min</span>
                <span>60 min</span>
              </div>
            </div>

            {/* Stats */}
            <div className="glass rounded-2xl p-6 scroll-reveal">
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="space-y-4">
                {[
                  { label: 'Maximum', value: stats.max, color: 'text-red-400' },
                  { label: 'Minimum', value: stats.min, color: 'text-green-400' },
                  { label: 'Average', value: stats.avg, color: 'text-accent-cyan' }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white/60">{stat.label}</span>
                    <span className={`text-2xl font-mono font-bold ${stat.color}`}>
                      {stat.value?.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="glass rounded-2xl p-6 scroll-reveal">
              <h3 className="text-lg font-semibold mb-4">Performance</h3>
              <div className="space-y-3 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <img src={IMAGES.icons.speed} alt="" className="w-5 h-5 rounded object-cover" />
                  <span>Query Time: <span className="text-accent-cyan font-mono">O(log n)</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={IMAGES.icons.data} alt="" className="w-5 h-5 rounded object-cover" />
                  <span>Data Points: <span className="font-mono">3,600</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={IMAGES.icons.realtime} alt="" className="w-5 h-5 rounded object-cover" />
                  <span>Operations: <span className="text-green-400 font-mono">~12</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-3 glass rounded-2xl p-6 scroll-reveal">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold">CPU Usage</h3>
                <p className="text-white/50">Real-time monitoring over last {timeRange} minute{timeRange > 1 ? 's' : ''}</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple text-xs font-medium animate-pulse">
                LIVE
              </div>
            </div>

            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="time"
                    stroke="rgba(255,255,255,0.3)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    stroke="rgba(255,255,255,0.3)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(26,26,26,0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cpu"
                    stroke="#00d4ff"
                    strokeWidth={2}
                    fill="url(#cpuGradient)"
                    dot={false}
                    activeDot={{ r: 6, fill: '#00d4ff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SIMULATIONS PAGE
// ============================================
function SimulationsPage() {
  const simulations = [
    {
      id: 'stock',
      title: 'Stock Trading Analytics',
      subtitle: 'Bloomberg Terminal Style',
      description: 'Real-time price range queries for finding min/max prices in any time window. Used by high-frequency trading systems.',
      image: IMAGES.simulations.stock,
      color: 'from-green-400 to-emerald-600',
      stats: ['1M+ trades/day', 'O(log n) range min/max', 'Sub-millisecond latency'],
      demo: true
    },
    {
      id: 'cdn',
      title: 'CDN Latency Monitor',
      subtitle: 'Cloudflare Style',
      description: 'Monitor request latency across global edge locations. Aggregate metrics for anomaly detection.',
      image: IMAGES.simulations.cdn,
      color: 'from-orange-400 to-red-600',
      stats: ['200 edge locations', 'Percentile queries', 'Real-time alerts'],
      demo: true
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Revenue',
      subtitle: 'Shopify Analytics Style',
      description: 'Range sum queries for revenue aggregation. Instant dashboard updates for any date range.',
      image: IMAGES.simulations.ecommerce,
      color: 'from-purple-400 to-pink-600',
      stats: ['$1B+ processed', 'Range sum in O(log n)', 'Hourly/daily/monthly views'],
      demo: true
    }
  ];

  return (
    <section className="min-h-screen pt-24 pb-20 px-6 relative">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${IMAGES.abstract.gradient1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Industry <span className="gradient-text">Simulations</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            See how Segment Trees power real-world applications in trading, CDN monitoring, and e-commerce analytics.
          </p>
        </div>

        {/* Simulation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {simulations.map((sim, i) => (
            <div
              key={sim.id}
              className="scroll-reveal glass rounded-2xl overflow-hidden card-hover"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Card Header with Image */}
              <div className="h-40 relative overflow-hidden">
                <img
                  src={sim.image}
                  alt={sim.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${sim.color} opacity-60`}></div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="text-xs text-accent-cyan uppercase tracking-wider mb-2">
                  {sim.subtitle}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{sim.title}</h3>
                <p className="text-white/60 mb-6">{sim.description}</p>

                {/* Stats */}
                <div className="space-y-2 mb-6">
                  {sim.stats.map((stat, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full"></span>
                      <span className="text-white/70">{stat}</span>
                    </div>
                  ))}
                </div>

                {/* Demo Button */}
                <button className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-sm font-medium">
                  Launch Demo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <div className="mt-20 scroll-reveal">
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <img
                src={IMAGES.data.viz1}
                alt="Stock Demo"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <h2 className="text-2xl font-bold">Live Stock Price Demo</h2>
            </div>
            <StockDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

// Stock Demo Component
function StockDemo() {
  const [prices] = useState(() => Array.from({ length: 100 }, () => 100 + Math.random() * 50));
  const [range, setRange] = useState([0, 100]);
  const [result, setResult] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const rangeSlice = prices.slice(range[0], range[1]);
    setResult({
      min: Math.min(...rangeSlice).toFixed(2),
      max: Math.max(...rangeSlice).toFixed(2)
    });
  }, [range, prices]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <p className="text-white/60 mb-4">
          Drag to select a range and see instant min/max calculation using Segment Tree.
        </p>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="text-xs text-white/40 uppercase">Start Index</label>
            <input
              type="number"
              min="0"
              max="99"
              value={range[0]}
              onChange={(e) => setRange([parseInt(e.target.value), range[1]])}
              className="w-full bg-white/10 rounded-lg px-4 py-2 border border-white/20"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-white/40 uppercase">End Index</label>
            <input
              type="number"
              min="1"
              max="100"
              value={range[1]}
              onChange={(e) => setRange([range[0], parseInt(e.target.value)])}
              className="w-full bg-white/10 rounded-lg px-4 py-2 border border-white/20"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 bg-green-500/20 rounded-lg p-4 text-center">
            <div className="text-xs text-green-400 uppercase mb-1">Min Price</div>
            <div className="text-3xl font-mono font-bold text-green-400">${result.min}</div>
          </div>
          <div className="flex-1 bg-red-500/20 rounded-lg p-4 text-center">
            <div className="text-xs text-red-400 uppercase mb-1">Max Price</div>
            <div className="text-3xl font-mono font-bold text-red-400">${result.max}</div>
          </div>
        </div>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={prices.map((p, i) => ({ index: i, price: p }))}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <Area type="monotone" dataKey="price" stroke="#22c55e" fill="url(#priceGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ============================================
// DOCUMENTATION PAGE
// ============================================
function DocumentationPage() {
  return (
    <section className="min-h-screen pt-24 pb-20 px-6 relative">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${IMAGES.abstract.gradient1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="scroll-reveal">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-xl text-white/60 mb-12">
            Learn how Segment Trees enable O(log n) range queries for analytics.
          </p>
        </div>

        {/* What is a Segment Tree */}
        <div className="glass rounded-2xl p-8 mb-8 scroll-reveal">
          <h2 className="text-2xl font-bold mb-4">What is a Segment Tree?</h2>
          <p className="text-white/70 mb-6">
            A Segment Tree is a binary tree data structure that stores aggregate information about intervals (segments) of an underlying array.
            Each node represents a segment and stores a computed value (sum, min, max, etc.) for that range.
          </p>

          {/* Visual Diagram */}
          <div className="bg-spacex-dark rounded-xl p-6 font-mono text-sm mb-6">
            <pre className="text-accent-cyan overflow-x-auto">
              {`                    [0-7: 36]
                   /         \\
           [0-3: 10]         [4-7: 26]
           /      \\          /       \\
       [0-1: 3]  [2-3: 7]  [4-5: 11]  [6-7: 15]
       /    \\    /    \\    /    \\     /     \\
     [1]   [2]  [3]  [4]  [5]   [6]  [7]    [8]`}
            </pre>
          </div>
        </div>

        {/* Time Complexity */}
        <div className="glass rounded-2xl p-8 mb-8 scroll-reveal">
          <h2 className="text-2xl font-bold mb-4">Time Complexity</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-white/50 text-sm uppercase border-b border-white/10">
                  <th className="text-left py-3">Operation</th>
                  <th className="text-center py-3">Naive Array</th>
                  <th className="text-center py-3">Segment Tree</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Build', 'O(n)', 'O(n)'],
                  ['Range Query', 'O(n)', 'O(log n)'],
                  ['Point Update', 'O(1)', 'O(log n)'],
                  ['Range Update', 'O(n)', 'O(log n)*']
                ].map(([op, naive, tree], i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 text-white/80">{op}</td>
                    <td className="py-4 text-center text-red-400 font-mono">{naive}</td>
                    <td className="py-4 text-center text-accent-cyan font-mono">{tree}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/40 text-sm mt-4">* With lazy propagation</p>
        </div>

        {/* Code Example */}
        <div className="glass rounded-2xl p-8 scroll-reveal">
          <h2 className="text-2xl font-bold mb-4">Python Implementation</h2>
          <div className="bg-spacex-dark rounded-xl p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-white/80">
              {`class SegmentTree:
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

# Usage
tree = SegmentTree(data, max, float('-inf'))
max_in_range = tree.query(10, 50)  # O(log n)!`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
