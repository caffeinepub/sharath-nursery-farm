import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllSales, useGetLowStockPlants, useGetAllDeadPlants } from '../hooks/useQueries';
import { TrendingUp, ShoppingCart, AlertTriangle, Skull, Plus, Package, DollarSign } from 'lucide-react';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { formatCurrency, formatDate } from '../lib/utils';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: sales = [] } = useGetAllSales();
  const { data: lowStock = [] } = useGetLowStockPlants();
  const { data: deadPlants = [] } = useGetAllDeadPlants();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = BigInt(today.getTime() * 1000000);

  const todaySales = sales.filter(sale => sale.date >= todayTimestamp);
  const todayTotal = todaySales.reduce((sum, sale) => sum + sale.totalPaid, 0);
  const todayBillsCount = todaySales.length;

  const recentDeadPlants = [...deadPlants].sort((a, b) => Number(b.date - a.date)).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-nursery-primary">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Sharath Nursery Farm</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-nursery-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-nursery-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-nursery-primary">{formatCurrency(todayTotal)}</div>
            <p className="text-xs text-muted-foreground">{todayBillsCount} bills generated</p>
          </CardContent>
        </Card>

        <Card className="border-nursery-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bills Count</CardTitle>
            <ShoppingCart className="h-4 w-4 text-nursery-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-nursery-accent">{todayBillsCount}</div>
            <p className="text-xs text-muted-foreground">Today's transactions</p>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{lowStock.length}</div>
            <p className="text-xs text-muted-foreground">Items below 5 units</p>
          </CardContent>
        </Card>

        <Card className="border-nursery-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dead Plants</CardTitle>
            <Skull className="h-4 w-4 text-nursery-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-nursery-secondary">{deadPlants.length}</div>
            <p className="text-xs text-muted-foreground">Total recorded losses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-nursery-primary">Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart sales={sales} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStock.length === 0 ? (
                <p className="text-sm text-muted-foreground">No low stock items</p>
              ) : (
                lowStock.slice(0, 5).map((product) => (
                  <div key={Number(product.id)} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{product.productType}</p>
                    </div>
                    <span className="rounded-full bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground">
                      {Number(product.stockQty)} left
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-nursery-secondary">Recent Dead Plant Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentDeadPlants.length === 0 ? (
              <p className="text-sm text-muted-foreground">No dead plant records</p>
            ) : (
              recentDeadPlants.map((deadPlant, idx) => (
                <div key={idx} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="text-sm font-medium">{deadPlant.productName}</p>
                    <p className="text-xs text-muted-foreground">{deadPlant.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-destructive">
                      {Number(deadPlant.deadQuantity)} units
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(deadPlant.date)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Button
          size="lg"
          className="h-20 bg-nursery-primary hover:bg-nursery-primary/90"
          onClick={() => navigate({ to: '/billing' })}
        >
          <Plus className="mr-2 h-5 w-5" />
          New Bill
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-20 border-nursery-primary text-nursery-primary hover:bg-nursery-primary/10"
          onClick={() => navigate({ to: '/plants' })}
        >
          <Package className="mr-2 h-5 w-5" />
          Add Stock
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-20 border-nursery-secondary text-nursery-secondary hover:bg-nursery-secondary/10"
          onClick={() => navigate({ to: '/expenses' })}
        >
          <DollarSign className="mr-2 h-5 w-5" />
          Add Expense
        </Button>
      </div>
    </div>
  );
}
