export type Category = 'Food' | 'Academics' | 'Transport' | 'Wants';

export interface Expense {
  id: string;
  item_name: string;
  amount: number;
  category: Category;
  expense_date: string;
  created_at: string;
}

export interface Settings {
  id: string;
  daily_budget: number;
  updated_at: string;
}

export const CATEGORIES: Category[] = ['Food', 'Academics', 'Transport', 'Wants'];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#22c55e',
  Academics: '#3b82f6',
  Transport: '#f59e0b',
  Wants: '#ec4899',
};

export const getCategoryClass = (category: Category): string => {
  const classes: Record<Category, string> = {
    Food: 'category-food',
    Academics: 'category-academics',
    Transport: 'category-transport',
    Wants: 'category-wants',
  };
  return classes[category];
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};