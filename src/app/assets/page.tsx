/* eslint-disable no-underscore-dangle */
import React from 'react';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import SideNav from '@/components/Sidenav';
import { Table, Button } from 'react-bootstrap';
import LivePrice from '@/components/LivePrice';

const COINGECKO_MAP: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  ADA: 'cardano',
  DOGE: 'dogecoin',
  KOMPETE: 'kompete',
  // add more depending on your portfolio
};

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
      profitLoss: true,
    },
    _avg: {
      avgBuyPrice: true,
    },
  });

  return (
    <div className="d-flex">
      <SideNav />
      <main className="flex-grow-1 p-3">
        <h1>Assets</h1>
        <p>This is the Assets page.</p>
        <Button type="submit" variant="primary" className="mb-3" href="/assets/add">
          Add Assets
        </Button>

        <Table striped bordered hover>
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
            {assets.map((asset) => {
              const coingeckoId = COINGECKO_MAP[asset.assetName.toUpperCase()] ?? null;

              const amount = asset._sum.assetAmount ?? 0;
              const spent = asset._sum.dollarAmount ?? 0;
              const avgBuy = amount ? spent / amount : 0;

              return (
                <tr key={asset.assetName}>
                  <td>{asset.assetName}</td>

                  {/* Live Price */}
                  <td>{coingeckoId ? <LivePrice symbol={coingeckoId} mode="price" /> : 'N/A'}</td>

                  {/* Amount & Spent */}
                  <td>{amount}</td>
                  <td>{spent}</td>

                  {/* Worth = live price × amount */}
                  <td>{coingeckoId ? <LivePrice symbol={coingeckoId} mode="worth" amount={amount} /> : 'N/A'}</td>

                  {/* Avg Buy (from sums) */}
                  <td>{avgBuy.toFixed(2)}</td>

                  {/* Live P/L = (live price × amount) − (avgBuy × amount) */}
                  <td>
                    {coingeckoId
                      ? <LivePrice symbol={coingeckoId} mode="pl" amount={amount} avgBuy={avgBuy} />
                      : 'N/A'}
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
