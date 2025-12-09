import { AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/lib/expense-utils';

interface BudgetAlertProps {
  todayTotal: number;
  budget: number;
}

const BudgetAlert = ({ todayTotal, budget }: BudgetAlertProps) => {
  const isOverBudget = todayTotal > budget;
  const percentage = (todayTotal / budget) * 100;

  if (!isOverBudget) return null;

  return (
    <div className="budget-alert flex items-center gap-4 animate-fade-in">
      <div className="flex-shrink-0">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <div className="flex-1">
        <h3 className="font-mono font-bold text-lg">Warning: Daily Budget Exceeded!</h3>
        <p className="text-sm opacity-80">
          You've spent {formatCurrency(todayTotal)} today — {percentage.toFixed(0)}% of your {formatCurrency(budget)} budget.
        </p>
      </div>
    </div>
  );
};

export default BudgetAlert;