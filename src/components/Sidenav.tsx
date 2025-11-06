'use client';

import { Nav, Navbar } from 'react-bootstrap';
import { BodyText, FileEarmarkPlus, Gear, GraphUp, House, Journal } from 'react-bootstrap-icons';
import styles from './Sidenave.module.css';

function SideNav() {
  return (
    <Navbar className={styles.sidenav}>

      <Navbar.Brand className={styles.brandlogo}>Trade Journal</Navbar.Brand>

      <Nav className="mt-4  flex-column menu">
        <Nav.Link href="/" className={styles.menuItem}>
          <House className={styles.menuicon} />
          DashBoard
        </Nav.Link>
        <Nav.Link href="/assets" className={styles.menuItem}>
          <BodyText className={styles.menuicon} />
          Assets
        </Nav.Link>
        <Nav.Link href="/list" className={styles.menuItem}>
          <GraphUp className={styles.menuicon} />
          Trades
        </Nav.Link>
        <Nav.Link href="/journal" className={styles.menuItem}>
          <Journal className={styles.menuicon} />
          Journal
        </Nav.Link>
        <Nav.Link href="/add" className={styles.menuItem}>
          <FileEarmarkPlus className={styles.menuicon} />
          Trade
        </Nav.Link>
        <Nav.Link href="/settings" className={styles.menuItem}>
          <Gear className={styles.menuicon} />
          Settings
        </Nav.Link>
      </Nav>

    </Navbar>
  );
}

export default SideNav;
