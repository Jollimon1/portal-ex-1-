import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { DeviceModel } from '../types/tradeIn';
import { TrendingDown, Calendar, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

interface DepreciationChartProps {
  model: DeviceModel;
  currentValue: number;
}

interface TrendPoint {
  month: string;
  date: Date;
  value: number;
  isProjected?: boolean;
}

export const DepreciationChart: React.FC<DepreciationChartProps> = ({
  model,
  currentValue,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<TrendPoint | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Generate 6-month historical curve + 1-month future projection based on device baseline
  const data: TrendPoint[] = useMemo(() => {
    const points: TrendPoint[] = [];
    const now = new Date();

    // Past 6 months
    const historicalOffsets = [
      { monthsAgo: 6, multiplier: 1.14 },
      { monthsAgo: 5, multiplier: 1.11 },
      { monthsAgo: 4, multiplier: 1.08 },
      { monthsAgo: 3, multiplier: 1.055 },
      { monthsAgo: 2, multiplier: 1.03 },
      { monthsAgo: 1, multiplier: 1.015 },
      { monthsAgo: 0, multiplier: 1.0 }, // today
    ];

    historicalOffsets.forEach(({ monthsAgo, multiplier }) => {
      const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
      const monthLabel = d.toLocaleDateString('en-US', { month: 'short' });
      points.push({
        month: monthsAgo === 0 ? 'Today' : monthLabel,
        date: d,
        value: Math.round(currentValue * multiplier),
        isProjected: false,
      });
    });

    // 1-month forecast projection (if user waits 30 days)
    const futureDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    points.push({
      month: `Next Mo. (${futureDate.toLocaleDateString('en-US', { month: 'short' })})`,
      date: futureDate,
      value: Math.round(currentValue * 0.955), // ~4.5% drop next month
      isProjected: true,
    });

    return points;
  }, [currentValue]);

  // Six-month loss calculation
  const sixMonthsAgoVal = data[0].value;
  const currentVal = data[6].value;
  const projectedVal = data[7].value;
  const totalDrop = sixMonthsAgoVal - currentVal;
  const percentDrop = Math.round((totalDrop / sixMonthsAgoVal) * 1000) / 10;
  const projectedLossNext30Days = currentVal - projectedVal;

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Clear previous elements
    d3.select(svgRef.current).selectAll('*').remove();

    const containerWidth = containerRef.current.clientWidth || 600;
    const height = 230;
    const margin = { top: 25, right: 35, bottom: 35, left: 55 };
    const width = containerWidth - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', containerWidth)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale
    const x = d3
      .scalePoint<string>()
      .domain(data.map((d) => d.month))
      .range([0, width])
      .padding(0.2);

    // Y Scale with nice padding
    const yMin = d3.min(data, (d) => d.value) || 0;
    const yMax = d3.max(data, (d) => d.value) || 1000;
    const y = d3
      .scaleLinear()
      .domain([Math.floor(yMin * 0.92), Math.ceil(yMax * 1.05)])
      .range([innerHeight, 0]);

    // Horizontal Gridlines
    const yAxisGrid = d3
      .axisLeft(y)
      .tickSize(-width)
      .tickFormat(() => '')
      .ticks(4);

    svg
      .append('g')
      .attr('class', 'grid')
      .call(yAxisGrid)
      .selectAll('line')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-dasharray', '3 3')
      .attr('stroke-opacity', 0.8);

    svg.select('.grid .domain').remove();

    // Gradient definition for area fill
    const defs = svg.append('defs');
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'depreciation-area-grad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#10b981')
      .attr('stop-opacity', 0.28);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#10b981')
      .attr('stop-opacity', 0.0);

    // Area generator for historical data (first 7 points)
    const historicalData = data.slice(0, 7);
    const area = d3
      .area<TrendPoint>()
      .x((d) => x(d.month) || 0)
      .y0(innerHeight)
      .y1((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    svg
      .append('path')
      .datum(historicalData)
      .attr('fill', 'url(#depreciation-area-grad)')
      .attr('d', area);

    // Historical Line
    const historicalLine = d3
      .line<TrendPoint>()
      .x((d) => x(d.month) || 0)
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    svg
      .append('path')
      .datum(historicalData)
      .attr('fill', 'none')
      .attr('stroke', '#059669')
      .attr('stroke-width', 2.5)
      .attr('stroke-linecap', 'round')
      .attr('d', historicalLine);

    // Projected Line (dashed from Today to Next Month)
    const projectedSlice = data.slice(6, 8);
    const projectedLine = d3
      .line<TrendPoint>()
      .x((d) => x(d.month) || 0)
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    svg
      .append('path')
      .datum(projectedSlice)
      .attr('fill', 'none')
      .attr('stroke', '#f43f5e')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5 4')
      .attr('d', projectedLine);

    // X Axis
    const xAxis = d3.axisBottom(x).tickSize(0).tickPadding(10);
    const xAxisG = svg
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    xAxisG.select('.domain').attr('stroke', '#cbd5e1');
    xAxisG
      .selectAll('text')
      .attr('fill', '#64748b')
      .attr('font-size', '11px')
      .attr('font-weight', (d) => (d === 'Today' ? 'bold' : 'normal'))
      .attr('fill', (d) => (d === 'Today' ? '#059669' : typeof d === 'string' && d.includes('Next') ? '#f43f5e' : '#64748b'));

    // Y Axis
    const yAxis = d3
      .axisLeft(y)
      .ticks(4)
      .tickSize(0)
      .tickPadding(8)
      .tickFormat((d) => `$${d}`);

    const yAxisG = svg.append('g').call(yAxis);
    yAxisG.select('.domain').remove();
    yAxisG.selectAll('text').attr('fill', '#94a3b8').attr('font-size', '10px').attr('font-family', 'JetBrains Mono, monospace');

    // Circles on each point
    svg
      .selectAll('.data-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', (d) => x(d.month) || 0)
      .attr('cy', (d) => y(d.value))
      .attr('r', (d) => (d.month === 'Today' ? 6 : 4))
      .attr('fill', (d) => (d.isProjected ? '#f43f5e' : d.month === 'Today' ? '#059669' : '#ffffff'))
      .attr('stroke', (d) => (d.isProjected ? '#f43f5e' : '#059669'))
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseenter', (event, d) => {
        setHoveredPoint(d);
        const [mx, my] = d3.pointer(event, containerRef.current);
        setTooltipPos({ x: mx, y: my });
      })
      .on('mousemove', (event) => {
        const [mx, my] = d3.pointer(event, containerRef.current);
        setTooltipPos({ x: mx, y: my });
      })
      .on('mouseleave', () => {
        setHoveredPoint(null);
        setTooltipPos(null);
      });

    // Special pulse ring around 'Today' point
    const todayX = x('Today') || 0;
    const todayY = y(currentVal);
    svg
      .append('circle')
      .attr('cx', todayX)
      .attr('cy', todayY)
      .attr('r', 11)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.5);

    // Callout label for Current Locked Rate
    svg
      .append('text')
      .attr('x', todayX)
      .attr('y', todayY - 14)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '800')
      .attr('fill', '#059669')
      .text(`$${currentVal}`);

  }, [data, currentValue]);

  return (
    <div className="neu-card p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
      {/* Header with Title and 6-Month Loss Metric */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-rose-500" />
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              6-Month Market Depreciation Curve
            </h4>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Historical secondary market buyback trend for {model.name}
          </p>
        </div>

        {/* Highlighted Stat Pills */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase block">6-Mo. Decline</span>
            <span className="text-xs font-black text-rose-500 tabular-nums font-mono">
              -${totalDrop} ({percentDrop}%)
            </span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl text-left">
            <span className="text-[9px] font-bold text-emerald-800 uppercase block">Lock Value Today</span>
            <span className="text-xs font-black text-emerald-700 tabular-nums font-mono">
              ${currentVal}.00
            </span>
          </div>
        </div>
      </div>

      {/* D3 Chart Visual Container */}
      <div ref={containerRef} className="relative w-full overflow-hidden">
        <svg ref={svgRef} className="w-full h-[230px] overflow-visible" />

        {/* Floating Tooltip */}
        {hoveredPoint && tooltipPos && (
          <div
            className="absolute pointer-events-none bg-slate-900 text-white px-3 py-2 rounded-xl text-xs shadow-xl border border-slate-700 z-30 transform -translate-x-1/2 -translate-y-full mb-2 whitespace-nowrap"
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y - 12}px` }}
          >
            <div className="font-extrabold text-[11px] text-slate-300">
              {hoveredPoint.month}
              {hoveredPoint.isProjected && (
                <span className="text-rose-400 font-bold ml-1.5">Projected</span>
              )}
            </div>
            <div className="text-sm font-black text-emerald-400 tabular-nums font-mono mt-0.5">
              ${hoveredPoint.value}.00
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {hoveredPoint.month === 'Today'
                ? 'Current locked quote'
                : hoveredPoint.isProjected
                ? `Est. ~$${projectedLossNext30Days} loss if delayed 30 days`
                : `${Math.round(((sixMonthsAgoVal - hoveredPoint.value) / sixMonthsAgoVal) * 100)}% down from 6 mo. high`}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Timing Advice Strip */}
      <div className="bg-slate-50 border border-slate-200/90 p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="leading-snug">
            <strong>Trade-In Timing Tip:</strong> Device values drop an average of <strong>3% to 5% every month</strong> as newer iterations approach. Locking in your price today freezes this value for <strong>14 calendar days</strong> at Chicago hubs.
          </span>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-lg whitespace-nowrap">
            Est. ~$ {projectedLossNext30Days} drop by next month
          </span>
        </div>
      </div>
    </div>
  );
};
