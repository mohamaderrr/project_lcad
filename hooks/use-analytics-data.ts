'use client';

import { useState, useEffect } from 'react';

export function useAnalyticsData(filters: Record<string, string>) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<Record<string, string[]>>({});
  const [metrics, setMetrics] = useState<Record<string, any>>({});
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken); // can be null, it's ok
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== 'all') {
            queryParams.append(key, value);
          }
        });

        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        // Only add Authorization if we actually have a token
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`/api/analytics?${queryParams.toString()}`, {
          headers,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setData(result.data);
        setMetrics(result.metrics);
        setFilterOptions(result.filterOptions);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    // 👇 ALWAYS fetch, even if token is null
    fetchData();
  }, [filters, token]);

  return { data, loading, error, filterOptions, metrics };
}
