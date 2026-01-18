
import React, { useState, useEffect, useCallback } from 'react';
import { FunctionParams } from './types';
import Graph from './components/Graph';
import Controls from './components/Controls';
import { getMathInsight } from './services/geminiService';

const App: React.FC = () => {
  const [params, setParams] = useState<FunctionParams>({ a: 1, h: 0, k: 0 });
  const [insight, setInsight] = useState<string>("Loading mathematical insight...");
  const [isLoadingInsight, setIsLoadingInsight] = useState<boolean>(false);

  const handleParamChange = (key: keyof FunctionParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  // Debounced insight fetching to not spam Gemini API
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setIsLoadingInsight(true);
      const newInsight = await getMathInsight(params);
      setInsight(newInsight);
      setIsLoadingInsight(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [params]);

  const renderEquation = () => {
    const { a, h, k } = params;
    const aText = a === 1 ? '' : a === -1 ? '-' : a.toFixed(1);
    const hText = h === 0 ? 'x' : h > 0 ? `x - ${h.toFixed(1)}` : `x + ${Math.abs(h).toFixed(1)}`;
    const kText = k === 0 ? '' : k > 0 ? ` + ${k.toFixed(1)}` : ` - ${Math.abs(k).toFixed(1)}`;

    return (
      <div className="text-3xl md:text-5xl font-bold math-font text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-rose-400 py-4">
        f(x) = {aText}|{hText}|{kText}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="flex flex-col items-center space-y-2">
          <h1 className="text-sm font-bold text-sky-500 uppercase tracking-[0.2em]">Function Explorer</h1>
          <div className="bg-slate-800/50 border border-slate-700 rounded-3xl px-8 py-2 shadow-inner">
            {renderEquation()}
          </div>
          <p className="text-slate-400 text-center max-w-md text-sm md:text-base">
            Visualize the transformations of the absolute value function. Use the sliders to change its shape and position.
          </p>
        </header>

        {/* Main Content: Graph and Controls */}
        <main className="grid grid-cols-1 gap-8">
          <Graph params={params} />
          
          <Controls params={params} onChange={handleParamChange} />

          {/* AI Insights Card */}
          <section className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3">
              <div className={`w-3 h-3 rounded-full ${isLoadingInsight ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
            </div>
            <h2 className="text-xs font-bold text-slate-500 uppercase mb-2">Gemini AI Insight</h2>
            <p className={`text-lg transition-opacity duration-300 ${isLoadingInsight ? 'opacity-50' : 'opacity-100'}`}>
              {insight}
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="pt-12 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
          <p>The vertex of this function is at <span className="text-rose-400 font-bold">({params.h.toFixed(1)}, {params.k.toFixed(1)})</span>.</p>
          <div className="w-12 h-1 bg-slate-800 rounded-full my-2"></div>
          <p>© 2024 Math Lab. Built with Gemini AI.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
