'use client';
import { useState, useEffect } from 'react';
import { SiteSettings } from '@/types';
import { DEFAULT_EXCHANGE_RATE } from '@/lib/constants';

const defaultSettings: Partial<SiteSettings> = {
  exchange_rate_syp: DEFAULT_EXCHANGE_RATE,
  sham_cash_enabled: false,
  whatsapp_number: '+963936666950',
};

export function useSettings() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => { if (d.data) setSettings(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
}
