
import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { FunctionParams, DataPoint } from '../types.ts';

interface GraphProps {
  params: FunctionParams;
}

const Graph: React.FC<GraphProps> = ({ params }) => {
  const data = useMemo(() => {
    const points: DataPoint[] = [];
    const step = 0.5;
    const range = 15;
    
    // Generate points around the vertex for better detail
    for (let x = -range; x <= range; x += step) {
      const y = params.a * Math.abs(x - params.h) + params.k;
      points.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
    }
    return points;
  }, [params]);

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-slate-800/50 rounded-2xl p-4 border border-slate-700 shadow-xl">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="x" 
            type="number" 
            domain={[-12, 12]} 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis 
            type="number" 
            domain={[-12, 12]} 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }}
            itemStyle={{ color: '#38bdf8' }}
            formatter={(value: number) => [value, 'f(x)']}
            labelFormatter={(label: number) => `x = ${label}`}
          />
          <ReferenceLine x={0} stroke="#475569" strokeWidth={2} />
          <ReferenceLine y={0} stroke="#475569" strokeWidth={2} />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
          {/* Vertex Point */}
          <ReferenceLine x={params.h} stroke="#f43f5e" strokeDasharray="3 3" />
          <ReferenceLine y={params.k} stroke="#f43f5e" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
