import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useExpenses } from '@/hooks/useExpenses';
import { CATEGORY_COLORS, Category, formatCurrency } from '@/lib/expense-utils';

const ExpenseChart = () => {
  const { data: expenses = [], isLoading } = useExpenses();

  const chartData = useMemo(() => {
    const categoryTotals: Record<Category, number> = {
      Food: 0,
      Academics: 0,
      Transport: 0,
      Wants: 0,
    };

    expenses.forEach((expense) => {
      categoryTotals[expense.category] += expense.amount;
    });

    return Object.entries(categoryTotals)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value: Number(value.toFixed(2)),
        color: CATEGORY_COLORS[name as Category],
      }));
  }, [expenses]);

  if (isLoading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-muted rounded"></div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="glass-card p-6">
        <h2 className="font-mono font-bold text-lg mb-4 text-foreground">Spending by Category</h2>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          <p>No expenses recorded yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h2 className="font-mono font-bold text-lg mb-4 text-foreground">Spending by Category</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(220 18% 14%)',
                border: '1px solid hsl(220 14% 20%)',
                borderRadius: '8px',
                color: 'hsl(210 40% 96%)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Legend
              wrapperStyle={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
              }}
              formatter={(value) => <span className="text-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;