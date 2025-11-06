/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import { useEffect, useState, useMemo } from 'react';

type Mode = 'price' | 'worth' | 'pl';

export default function LivePrice({
  symbol,
  mode = 'price',
  amount,
  avgBuy,
}: {
  symbol: string;
  mode?: Mode; // 'price' | 'worth' | 'pl'
  amount?: number; // required for 'worth' and 'pl'
  avgBuy?: number; // required for 'pl'
}) {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    let t: any;

    const load = async () => {
      // The app provides a /api/prices route which returns data in the shape:
      // { [id]: { usd: number } }
      // Call that route with the requested id and extract the USD price.
      const r = await fetch(`/api/prices?ids=${encodeURIComponent(symbol)}`, { cache: 'no-store' });
      const j = await r.json(); // e.g. { bitcoin: { usd    : 12345 } }
      const entry = j?.[symbol];
      const usd = entry?.usd;
      if (typeof usd === 'number') setPrice(usd);
      t = setTimeout(load, 5000);
    };

    load();
    return () => clearTimeout(t);
  }, [symbol]);

  const content = useMemo(() => {
    if (price == null) return '…';

    if (mode === 'price') {
      return price.toLocaleString();
    }

    if (mode === 'worth') {
      if (typeof amount !== 'number') return '—';
      const worth = price * amount;
      return worth.toLocaleString();
    }

    // mode === 'pl'
    if (typeof amount !== 'number' || typeof avgBuy !== 'number') return '—';
    const costBasis = avgBuy * amount;
    const liveValue = price * amount;
    const pl = liveValue - costBasis;
    const formatted = pl.toLocaleString();
    // eslint-disable-next-line no-nested-ternary
    const cls = pl > 0 ? 'text-success' : pl < 0 ? 'text-danger' : '';
    return <span className={cls}>{formatted}</span>;
  }, [price, mode, amount, avgBuy]);

  return <>{content}</>;
}
