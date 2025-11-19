'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Filter, X } from 'lucide-react';
import { useState } from 'react';

interface FilterPanelProps {
  filters: Record<string, string>;
  setFilters: (filters: Record<string, string>) => void;
  filterOptions: Record<string, string[]>;
}

export default function FilterPanel({ filters, setFilters, filterOptions }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleReset = () => {
    setFilters({
      category: 'all',
      gender: 'all',
      device: 'all',
      payment: 'all',
      startDate: '',
      endDate: '',
    });
  };

  const activeFilters = Object.values(filters).filter((v) => v && v !== 'all').length;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-chart-1" />
            <h3 className="font-semibold text-foreground">Filters</h3>
            {activeFilters > 0 && (
              <span className="bg-chart-1 text-white text-xs font-medium px-2 py-1 rounded-full">
                {activeFilters}
              </span>
            )}
          </div>
          {activeFilters > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-foreground">
              Reset
            </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Product Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-chart-1"
            >
              <option value="all">All Categories</option>
              {filterOptions.categories?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Gender</label>
            <select
              value={filters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-chart-1"
            >
              <option value="all">All</option>
              {filterOptions.genders?.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          {/* Device Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Device Type</label>
            <select
              value={filters.device}
              onChange={(e) => handleFilterChange('device', e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-chart-1"
            >
              <option value="all">All Devices</option>
              {filterOptions.devices?.map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
            <select
              value={filters.payment}
              onChange={(e) => handleFilterChange('payment', e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-chart-1"
            >
              <option value="all">All Methods</option>
              {filterOptions.paymentMethods?.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-chart-1"
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-chart-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
