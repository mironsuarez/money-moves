/* eslint-disable no-underscore-dangle */
import React from 'react';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import SideNav from '@/components/Sidenav';
import { Table, Button } from 'react-bootstrap';
import LivePrice from '@/components/LivePrice';
import styles from './page.module.css';

const COINGECKO_MAP: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  ADA: 'cardano',
  DOGE: 'dogecoin',
  KOMPETE: 'kompete',
  // add more depending on your portfolio
};

type DisplayAsset = {
  assetName: string;
  _sum: { assetAmount: number | null; dollarAmount: number | null };
  mockLivePrice?: number;
};

const mockAssets: DisplayAsset[] = [
  { assetName: 'BTC', _sum: { assetAmount: 0.42, dollarAmount: 12000 } },
  { assetName: 'ETH', _sum: { assetAmount: 3.5, dollarAmount: 8200 } },
  { assetName: 'SOL', _sum: { assetAmount: 95, dollarAmount: 2100 } },
  { assetName: 'AAPL', _sum: { assetAmount: 25, dollarAmount: 4200 }, mockLivePrice: 198.35 },
  { assetName: 'MSFT', _sum: { assetAmount: 12, dollarAmount: 3820 }, mockLivePrice: 416.2 },
  { assetName: 'TSLA', _sum: { assetAmount: 8, dollarAmount: 1880 }, mockLivePrice: 243.12 },
];

const AssetPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as { user: { email: string; id: string; randomKey: string } } | null,
  );
  const owner = session?.user?.email || '';

  const assets = await prisma.asset.groupBy({
    by: ['assetName'],
    where: { owner },
    _sum: {
      assetAmount: true,
      dollarAmount: true,
    },
  });

  const displayAssets: DisplayAsset[] = assets.length ? assets : mockAssets;

  return (
    <div className={`d-flex ${styles.page}`}>
      <SideNav />
      <main className={`flex-grow-1 p-3 ${styles.main}`}>
        <h1 className={styles.title}>Assets</h1>
        <p className={styles.subtitle}>This is the Assets page.</p>
        <Button type="submit" variant="primary" className={`mb-3 ${styles.addButton}`} href="/assets/add">
          Add Assets
        </Button>

        <Table striped bordered hover className={styles.table}>
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Live Price</th>
              <th>Asset Amount</th>
              <th>Dollar Amount</th>
              <th>Worth</th>
              <th>Avg. Buy Price</th>
              <th>P/L</th>
              {/* NEW */}
            </tr>
          </thead>
          <tbody>
            {displayAssets.map((asset) => {
              const coingeckoId = COINGECKO_MAP[asset.assetName.toUpperCase()] ?? null;

              const amount = Number(asset._sum.assetAmount ?? 0);
              const spent = Number(asset._sum.dollarAmount ?? 0);
              const avgBuy = amount ? spent / amount : 0;

              const mockLivePrice = asset.mockLivePrice;
              const mockWorth = typeof mockLivePrice === 'number' ? mockLivePrice * amount : null;
              const mockPl =
                typeof mockLivePrice === 'number'
                  ? mockLivePrice * amount - avgBuy * amount
                  : null;
              const mockPriceDisplay =
                typeof mockLivePrice === 'number'
                  ? mockLivePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 'N/A';
              const mockWorthDisplay =
                typeof mockWorth === 'number'
                  ? mockWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 'N/A';
              const mockPlDisplay =
                typeof mockPl === 'number'
                  ? mockPl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : 'N/A';

              return (
                <tr key={asset.assetName}>
                  <td>{asset.assetName}</td>

                  {/* Live Price */}
                  <td>
                    {coingeckoId
                      ? <LivePrice symbol={coingeckoId} mode="price" />
                      : mockPriceDisplay}
                  </td>

                  {/* Amount & Spent */}
                  <td>{amount.toFixed(2)}</td>
                  <td>{spent.toFixed(2)}</td>

                  {/* Worth = live price × amount */}
                  <td>
                    {coingeckoId
                      ? <LivePrice symbol={coingeckoId} mode="worth" amount={amount} />
                      : mockWorthDisplay}
                  </td>

                  {/* Avg Buy (from sums) */}
                  <td>{avgBuy.toFixed(2)}</td>

                  {/* Live P/L = (live price × amount) − (avgBuy × amount) */}
                  <td>
                    {coingeckoId
                      ? <LivePrice symbol={coingeckoId} mode="pl" amount={amount} avgBuy={avgBuy} />
                      : (
                        <span className={typeof mockPl === 'number' && mockPl > 0 ? 'text-success' : typeof mockPl === 'number' && mockPl < 0 ? 'text-danger' : ''}>
                          {mockPlDisplay}
                        </span>
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </main>
    </div>
  );
};

export default AssetPage;
