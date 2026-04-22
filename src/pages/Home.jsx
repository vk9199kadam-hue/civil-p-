import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/mockData';
import { BedDouble, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [dbProjects, setDbProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (res.ok) setDbProjects(data);
      } catch (err) {
        console.error('Failed to fetch live projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-soft-gray)', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* 🏗️ SIMPLE HEADER SECTION */}
      <section style={{ backgroundColor: 'var(--deep-navy)', padding: '4rem 0', color: 'white' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem' }}>Available Projects</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>Hand-verified property listings in the region.</p>
          </motion.div>
        </div>
      </section>

      {/* 🏢 PROJECT LISTINGS - Admin Filled Content */}
      <section style={{ marginTop: '2rem' }}>
        <div className="container">
          {loading ? (
             <div style={{ textAlign: 'center', padding: '4rem' }}>
                <h3>Loading LIVE properties from database...</h3>
             </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {dbProjects.length > 0 ? (
                dbProjects.map(p => (
                  <ProjectCard key={p.id} project={p} />
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem', gridColumn: '1 / -1' }}>
                  <h3>No projects currently available.</h3>
                  <p>Please check back later or contact the admin.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

// --- SUB-COMPONENTS ---

const ProjectCard = ({ project }) => (
  <motion.div 
    whileHover={{ y: -5 }} 
    style={{ 
      backgroundColor: 'white',
      borderRadius: 'var(--radius-lg)', 
      overflow: 'hidden', 
      border: '1px solid var(--border-light)', 
      boxShadow: 'var(--shadow-md)',
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <div style={{ position: 'relative', height: '200px' }}>
      <img src={project.coverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={project.name} />
      <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        {project.verified && (
          <span className="badge badge-verified" style={{ backgroundColor: 'white', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <CheckCircle2 size={14} color="var(--success-green)" /> Verified
          </span>
        )}
      </div>
    </div>
    
    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{project.category}</span>
        <h3 style={{ fontSize: '1.4rem', margin: '0.5rem 0' }}>{project.name}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={14} /> {project.location}
        </p>
      </div>

      <div style={{ marginBottom: '1.5rem', padding: '1rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--success-green)' }}>{project.priceRange}</p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Posession: {project.possessionDate || 'Immediate'}</p>
      </div>
      
      <div style={{ marginTop: 'auto' }}>
        <Link to={`/project/${project.id}`}>
          <button className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>
            View Project Details
          </button>
        </Link>
      </div>
    </div>
  </motion.div>
);

export default Home;

