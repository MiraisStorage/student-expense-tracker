import { useState, useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { useSettings, useUpdateBudget } from '@/hooks/useExpenses';
import { formatCurrency } from '@/lib/expense-utils';

const BudgetSettings = () => {
  const { data: settings, isLoading } = useSettings();
  const updateBudget = useUpdateBudget();
  const [budget, setBudget] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (settings) {
      setBudget(settings.daily_budget.toString());
    }
  }, [settings]);

  const handleSave = () => {
    const newBudget = parseFloat(budget);
    if (newBudget > 0) {
      updateBudget.mutate(newBudget, {
        onSuccess: () => setIsEditing(false),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card p-5 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/2 mb-3"></div>
        <div className="h-8 bg-muted rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <SettingsIcon className="w-4 h-4" />
          <span className="text-sm">Daily Budget</span>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs text-primary hover:underline"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <div className="flex gap-2">
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="form-input flex-1 py-2 text-lg font-mono"
            step="0.01"
            min="0.01"
          />
          <button
            onClick={handleSave}
            disabled={updateBudget.isPending}
            className="btn-primary py-2 px-4 text-sm"
          >
            {updateBudget.isPending ? '...' : 'Save'}
          </button>
        </div>
      ) : (
        <p className="font-mono text-2xl font-bold text-foreground">
          {formatCurrency(settings?.daily_budget || 0)}
        </p>
      )}
    </div>
  );
};

export default BudgetSettings;