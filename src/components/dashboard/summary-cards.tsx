import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const summaryData = {
  revenue: 1250000,
  expenses: 850000,
};
const profit = summaryData.revenue - summaryData.expenses;

export function SummaryCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{summaryData.revenue.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-muted-foreground">+12.5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <DollarSign className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{summaryData.expenses.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-muted-foreground">+8.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
          {profit >= 0 ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{profit.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-muted-foreground">+20.3% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}
