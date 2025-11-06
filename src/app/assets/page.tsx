import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import SideNav from '@/components/Sidenav';
import { Button, Table } from 'react-bootstrap';
import { Asset } from '@prisma/client';

const Assets = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

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
            <tr>
              <td>{Asset.assetName}</td>
              <td>{Asset.assetAmount}</td>
              <td>{Asset.dollarAmount}</td>
              <td>{Asset.avgBuyPrice}</td>
              <td>{Asset.pl}</td>
            </tr>
            {/* Sample data rows */}
          </tbody>
        </Table>
      </main>
    </div>
  );
};

export default Assets;
