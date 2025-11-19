'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

export default function ChartGrid({ data, loading, colors }: { data: any; loading: boolean; colors: string[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Sales by Category */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Sales & Profit by Category</CardTitle>
          <CardDescription>Revenue and profitability across product categories</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-80 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.salesByCategory || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="category" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                />
                <Legend />
                <Bar dataKey="sales" fill={colors[0]} />
                <Bar dataKey="profit" fill={colors[1]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Sales by Device */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Sales by Device</CardTitle>
          <CardDescription>Web vs Mobile distribution</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-80 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.salesByDevice || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(data.salesByDevice || []).map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Sales by Gender */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Sales by Gender</CardTitle>
          <CardDescription>Customer demographic breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-80 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.salesByGender || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(data.salesByGender || []).map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Profit by Payment Method */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Profit by Payment Method</CardTitle>
          <CardDescription>Revenue and order count by payment type</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-80 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.profitByPayment || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="paymentMethod" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                />
                <Legend />
                <Bar dataKey="profit" fill={colors[2]} />
                <Bar dataKey="orderCount" fill={colors[3]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Orders by Priority */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Orders by Priority</CardTitle>
          <CardDescription>Order distribution by urgency</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-80 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.ordersByPriority || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(data.ordersByPriority || []).map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
