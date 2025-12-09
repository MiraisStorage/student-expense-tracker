import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Expense, Settings, Category, getTodayDateString } from '@/lib/expense-utils';
import { toast } from '@/hooks/use-toast';

export const useExpenses = () => {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: async (): Promise<Expense[]> => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('expense_date', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(item => ({
        ...item,
        amount: Number(item.amount),
        category: item.category as Category
      }));
    },
  });
};

export const useTodayExpenses = () => {
  const today = getTodayDateString();
  
  return useQuery({
    queryKey: ['expenses', 'today', today],
    queryFn: async (): Promise<Expense[]> => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('expense_date', today)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(item => ({
        ...item,
        amount: Number(item.amount),
        category: item.category as Category
      }));
    },
  });
};

export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async (): Promise<Settings> => {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

      if (error) throw error;
      return {
        ...data,
        daily_budget: Number(data.daily_budget)
      };
    },
  });
};

export const useAddExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: {
      item_name: string;
      amount: number;
      category: Category;
      expense_date: string;
    }) => {
      const { data, error } = await supabase
        .from('expenses')
        .insert([expense])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({
        title: 'Expense Added',
        description: 'Your expense has been recorded successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to add expense. Please try again.',
        variant: 'destructive',
      });
      console.error('Error adding expense:', error);
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({
        title: 'Expense Deleted',
        description: 'The expense has been removed.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete expense.',
        variant: 'destructive',
      });
      console.error('Error deleting expense:', error);
    },
  });
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (daily_budget: number) => {
      const { data: settings } = await supabase
        .from('settings')
        .select('id')
        .single();

      if (!settings) throw new Error('No settings found');

      const { error } = await supabase
        .from('settings')
        .update({ daily_budget, updated_at: new Date().toISOString() })
        .eq('id', settings.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast({
        title: 'Budget Updated',
        description: 'Your daily budget has been updated.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update budget.',
        variant: 'destructive',
      });
      console.error('Error updating budget:', error);
    },
  });
};