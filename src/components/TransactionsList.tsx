import { Trash2 } from 'lucide-react';
import { useExpenses, useDeleteExpense } from '@/hooks/useExpenses';
import { formatCurrency, formatDate, getCategoryClass } from '@/lib/expense-utils';

const TransactionsList = () => {
  const { data: expenses = [], isLoading } = useExpenses();
  const deleteExpense = useDeleteExpense();

  if (isLoading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h2 className="font-mono font-bold text-lg mb-4 text-foreground">Recent Transactions</h2>
      
      {expenses.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No transactions yet</p>
          <p className="text-sm mt-1">Add your first expense above</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {expenses.slice(0, 20).map((expense, index) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{expense.item_name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(expense.expense_date)}</p>
                </div>
                <span className={`category-badge ${getCategoryClass(expense.category)}`}>
                  {expense.category}
                </span>
              </div>
              
              <div className="flex items-center gap-4 ml-4">
                <span className="font-mono font-semibold text-foreground">
                  {formatCurrency(expense.amount)}
                </span>
                <button
                  onClick={() => deleteExpense.mutate(expense.id)}
                  disabled={deleteExpense.isPending}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-destructive/20 rounded-lg"
                  aria-label="Delete expense"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsList;