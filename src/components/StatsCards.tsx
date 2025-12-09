import { TrendingUp, Calendar, Wallet } from 'lucide-react';
import { formatCurrency } from '@/lib/expense-utils';
import { useTodayExpenses, useSettings } from '@/hooks/useExpenses';

const StatsCards = () => {
  const { data: todayExpenses = [], isLoading: expensesLoading } = useTodayExpenses();
  const { data: settings, isLoading: settingsLoading } = useSettings();

  const todayTotal = todayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budget = settings?.daily_budget || 0;
  const remaining = budget - todayTotal;
  const percentage = budget > 0 ? (todayTotal / budget) * 100 : 0;

  const isLoading = expensesLoading || settingsLoading;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-5 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
      <div className="stat-card">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Today's Spending</span>
        </div>
        <p className="font-mono text-2xl font-bold text-foreground">
          {formatCurrency(todayTotal)}
        </p>
        <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage > 100 ? 'bg-destructive' : percentage > 80 ? 'bg-category-transport' : 'bg-primary'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {percentage.toFixed(0)}% of daily budget
        </p>
      </div>

      <div className="stat-card">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Wallet className="w-4 h-4" />
          <span className="text-sm">Remaining Today</span>
        </div>
        <p className={`font-mono text-2xl font-bold ${remaining >= 0 ? 'text-primary' : 'text-destructive'}`}>
          {formatCurrency(Math.abs(remaining))}
          {remaining < 0 && <span className="text-sm font-normal ml-1">over</span>}
        </p>
      </div>

      <div className="stat-card">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">Transactions Today</span>
        </div>
        <p className="font-mono text-2xl font-bold text-foreground">
          {todayExpenses.length}
        </p>
      </div>
    </div>
  );
};

export default StatsCards;