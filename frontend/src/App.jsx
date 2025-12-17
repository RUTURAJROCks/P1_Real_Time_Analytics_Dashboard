import { useState } from 'react';
import MetricsDashboard, { ThemeProvider } from './MetricsDashboard';
import DocumentationPage from './DocumentationPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

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

  const navigateTo = (page) => {
    playClickSound();
    setCurrentPage(page);
  };

  return (
    <ThemeProvider>
      <div className="relative">
        {/* Navigation Tab */}
        {currentPage === 'dashboard' && (
          <button
            onClick={() => navigateTo('documentation')}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-medium flex items-center gap-2"
          >
            📖 Documentation
          </button>
        )}

        {/* Page Content */}
        {currentPage === 'dashboard' ? (
          <MetricsDashboard />
        ) : (
          <DocumentationPage onBack={() => navigateTo('dashboard')} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
