import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import SideNav from '@/components/Sidenav';

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
        {/* Add your assets page content here */}
      </main>
    </div>
  );
};

export default Assets;
