import React from 'react';

export default function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  badge, 
  badgeColor = 'blue',
  highlight = false 
}) {
  const badgeClasses = {
    blue: 'bg-electric-500/10 text-electric-400 border-electric-500/30',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  }[badgeColor] || 'bg-electric-500/10 text-electric-400 border-electric-500/30';

  return (
    <div className={`p-5 rounded-2xl glass-card relative overflow-hidden transition-all duration-300 ${
      highlight ? 'ring-1 ring-electric-500/40 shadow-glow-blue' : ''
    }`}>
      {highlight && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-electric-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
      )}

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-navy-800/80 flex items-center justify-center text-electric-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-2">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
          {value}
        </span>
        {badge && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badgeClasses}`}>
            {badge}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
