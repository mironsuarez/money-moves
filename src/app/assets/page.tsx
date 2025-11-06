/* eslint-disable no-underscore-dangle */
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
// import StuffItem from '@/components/StuffItem';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import SideNav from '@/components/Sidenav';
import { Table, Button } from 'react-bootstrap';
import LivePrice from '@/components/LivePrice';
// eslint-disable-next-line import/extensions

/** Render a list of contacts for the logged in user. */
const AssetPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
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

  // console.log(assets);
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
              <th>Asset Amount</th>
              <th>Dollar Amount</th>
              <th>Avg. Buy Price</th>
              <th>P/L</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.assetName}>
                <td>{asset.assetName}</td>
                <td>{asset._sum.assetAmount ?? 0}</td>
                <td><LivePrice symbol={asset.assetName} /></td>
                <td>{asset._avg.avgBuyPrice ?? 0}</td>
                <td>{asset._sum.profitLoss ?? 0}</td>
              </tr>
            ))}
            {/* Sample data rows */}
          </tbody>
        </Table>
      </main>
    </div>
  );
};

export default AssetPage;
