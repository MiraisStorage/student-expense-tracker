-- Create expenses table
CREATE TABLE public.expenses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    item_name TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Food', 'Academics', 'Transport', 'Wants')),
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create settings table for budget
CREATE TABLE public.settings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    daily_budget DECIMAL(10, 2) NOT NULL DEFAULT 100.00,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default settings
INSERT INTO public.settings (daily_budget) VALUES (100.00);

-- Enable RLS
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create public access policies (since this is a shared home server app)
CREATE POLICY "Anyone can view expenses" ON public.expenses FOR SELECT USING (true);
CREATE POLICY "Anyone can insert expenses" ON public.expenses FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update expenses" ON public.expenses FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete expenses" ON public.expenses FOR DELETE USING (true);

CREATE POLICY "Anyone can view settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Anyone can update settings" ON public.settings FOR UPDATE USING (true);