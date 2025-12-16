import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CATEGORIES, Category, getTodayDateString } from '@/lib/expense-utils';
import { useAddExpense } from '@/hooks/useExpenses';

const ExpenseForm = () => {
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [date, setDate] = useState(getTodayDateString());

  const addExpense = useAddExpense();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!itemName.trim() || !amount || parseFloat(amount) <= 0) return;

    addExpense.mutate(
      {
        item_name: itemName.trim(),
        amount: parseFloat(amount),
        category,
        expense_date: date,
      },
      {
        onSuccess: () => {
          setItemName('');
          setAmount('');
          setCategory('Food');
          setDate(getTodayDateString());
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 animate-fade-in">
      <h2 className="font-mono font-bold text-lg mb-5 text-foreground">Add Expense</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-sm text-muted-foreground mb-2">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="What did you buy?"
            className="form-input w-full"
            required
            maxLength={100}
          />
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-2">Amount (₱)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0.01"
            className="form-input w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="form-input w-full"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-input w-full"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={addExpense.isPending}
        className="btn-primary mt-5 flex items-center gap-2 disabled:opacity-50"
      >
        <Plus className="w-4 h-4" />
        {addExpense.isPending ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;