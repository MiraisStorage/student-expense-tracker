import { Wallet } from 'lucide-react';
import BudgetAlert from '@/components/BudgetAlert';
import BudgetSettings from '@/components/BudgetSettings';
import ExpenseForm from '@/components/ExpenseForm';
import StatsCards from '@/components/StatsCards';
import ExpenseChart from '@/components/ExpenseChart';
import TransactionsList from '@/components/TransactionsList';
import { useTodayExpenses, useSettings } from '@/hooks/useExpenses';

const Index = () => {
  const { data: todayExpenses = [] } = useTodayExpenses();
  const { data: settings } = useSettings();

  const todayTotal = todayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budget = settings?.daily_budget || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-mono font-bold text-xl text-foreground">S.E.T.</h1>
              <p className="text-xs text-muted-foreground">Student Expense Tracker</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 space-y-6">
        {/* Budget Alert */}
        {budget > 0 && todayTotal > budget && (
          <BudgetAlert todayTotal={todayTotal} budget={budget} />
        )}

        {/* Top Row: Budget Settings + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <BudgetSettings />
          </div>
          <div className="lg:col-span-3">
            <StatsCards />
          </div>
        </div>

        {/* Expense Form */}
        <ExpenseForm />

        {/* Charts and Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseChart />
          <TransactionsList />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-8">
        <div className="container text-center text-xs text-muted-foreground">
          <p>S.E.T. — Built for smart spending</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;