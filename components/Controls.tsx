
import React from 'react';
import { FunctionParams } from '../types';

interface ControlsProps {
  params: FunctionParams;
  onChange: (key: keyof FunctionParams, value: number) => void;
}

const Controls: React.FC<ControlsProps> = ({ params, onChange }) => {
  const config = [
    { label: 'a (Stretch/Reflection)', key: 'a', min: -5, max: 5, step: 0.1, color: 'accent-sky-500' },
    { label: 'h (Horizontal Shift)', key: 'h', min: -10, max: 10, step: 0.5, color: 'accent-rose-500' },
    { label: 'k (Vertical Shift)', key: 'k', min: -10, max: 10, step: 0.5, color: 'accent-emerald-500' },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
      {config.map((item) => (
        <div key={item.key} className="flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              {item.label}
            </label>
            <span className="text-lg font-bold text-white math-font bg-slate-700 px-2 py-1 rounded">
              {params[item.key as keyof FunctionParams].toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min={item.min}
            max={item.max}
            step={item.step}
            value={params[item.key as keyof FunctionParams]}
            onChange={(e) => onChange(item.key as keyof FunctionParams, parseFloat(e.target.value))}
            className={`w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer ${item.color}`}
          />
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>{item.min}</span>
            <span>{item.max}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Controls;
