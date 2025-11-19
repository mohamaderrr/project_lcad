'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, X } from 'lucide-react';

interface FilterState {
  category: string;
  gender: string;
  device: string;
  payment: string;
  startDate: string;
  endDate: string;
}

interface FilterPanelProps {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  filterOptions: {
    categories?: string[];
    genders?: string[];
    devices?: string[];
    paymentMethods?: string[];
  };
}

export default function FilterPanel({ filters, setFilters, filterOptions }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
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

  const activeFilters = Object.entries(filters).filter(
    ([key, value]) => value !== 'all' && value !== ''
  ).length;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 font-semibold text-foreground hover:text-chart-1 transition-colors"
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              Filters {activeFilters > 0 && <span className="text-xs bg-chart-1 text-white px-2 py-1 rounded-full">{activeFilters}</span>}
            </button>
            {activeFilters > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          {isOpen && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4 border-t border-border">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
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
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="all">All Genders</option>
                  {filterOptions.genders?.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              {/* Device Filter */}
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Device</label>
                <select
                  value={filters.device}
                  onChange={(e) => handleFilterChange('device', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="all">All Devices</option>
                  {filterOptions.devices?.map((device) => (
                    <option key={device} value={device}>
                      {device}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Method Filter */}
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Payment Method</label>
                <select
                  value={filters.payment}
                  onChange={(e) => handleFilterChange('payment', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="all">All Methods</option>
                  {filterOptions.paymentMethods?.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date Filter */}
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Start Date</label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                />
              </div>

              {/* End Date Filter */}
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">End Date</label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
