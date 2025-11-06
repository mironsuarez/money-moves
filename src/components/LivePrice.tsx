'use client';

import { useEffect, useState } from 'react';

export default function LivePrice({ symbol }: { symbol: string }) {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    // Convert something like "BTC" → "bitcoin" for CoinGecko
    const id = symbol.toLowerCase();

    async function fetchPrice() {
      try {
        const r = await fetch(`/api/price?symbol=${id}`, { cache: 'no-store' });
        const j = await r.json();
        setPrice(j.price);
      } catch (e) {
        console.error(e);
      }
    }

    fetchPrice();
    const t = setInterval(fetchPrice, 5000);
    return () => clearInterval(t);
  }, [symbol]);

  return <span>{price ? price.toLocaleString() : '...'}</span>;
}
