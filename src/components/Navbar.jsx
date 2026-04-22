import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-light)' }}>
      <div className="container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{ backgroundColor: 'var(--primary-blue)', padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'white' }}>
            <Building2 size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', lineHeight: 1 }}>ISLAMPUR</h1>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.1em' }}>LOCAL DEALER PORTAL</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
            <Link to="/" style={{ color: 'var(--deep-navy)', textDecoration: 'none' }}>Home</Link>
            <Link to="/admin" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Admin Dashboard</Link>
          </div>

          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-light)' }}></div>

          <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
            <User size={18} />
            <span>Login</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

