import { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { getAllIssues } from '../api/issues.api';
import NewIssueModal from './CreateIssue';
import IssueCard from './IssueCard';
import RoleBadge from '../components/RoleBadge';
import './Issue.css';

// --- Main Page ---
const Issue = () => {
    const { user } = useAuth();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('all');

    const fetchIssues = async () => {
        try {
            setLoading(true);
            const res = await getAllIssues();
            setIssues(res.data.issues || res.data || []);
        } catch (err) {
            console.error('Failed to fetch issues:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchIssues(); }, []);

    const filtered = filter === 'all' ? issues : issues.filter(i => i.status === filter);

    const counts = {
        all: issues.length,
        open: issues.filter(i => i.status === 'open').length,
        in_progress: issues.filter(i => i.status === 'in_progress').length,
        resolved: issues.filter(i => i.status === 'resolved').length,
    };

    const initials = user?.username
        ? user.username.slice(0, 2).toUpperCase()
        : '??';

    return (
        <div className="page">
            {/* Topbar */}
            <header className="topbar">
                    <div className="topbar-left">
                        <div className="logo-mark">🏫</div>
                        <span className="app-title">CollegeIssue</span>
                    </div>
                    <div className="topbar-right">
                        <div className="user-info">
                            <span className="user-name">{user?.username || 'Guest'}</span>
                            <RoleBadge role={user?.role || 'student'} />
                        </div>
                        <div className="user-avatar" title={user?.username}>{initials}</div>
                    </div>
                </header>

                {/* Main content */}
                <main className="content">
                    {/* Stats */}
                    <div className="stats-row">
                        {[
                            { label: 'Total Issues', value: counts.all, color: '#a5b4fc' },
                            { label: 'Open',         value: counts.open, color: '#6366f1' },
                            { label: 'In Progress',  value: counts.in_progress, color: '#3b82f6' },
                            { label: 'Resolved',     value: counts.resolved, color: '#10b981' },
                        ].map(s => (
                            <div className="stat-card" key={s.label}>
                                <span className="stat-label">{s.label}</span>
                                <span className="stat-value" style={{ color: s.color }}>{s.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="filters">
                        {[
                            { key: 'all',         label: `All  (${counts.all})` },
                            { key: 'open',        label: `Open  (${counts.open})` },
                            { key: 'in_progress', label: `In Progress  (${counts.in_progress})` },
                            { key: 'resolved',    label: `Resolved  (${counts.resolved})` },
                        ].map(f => (
                            <button
                                key={f.key}
                                className={`filter-btn ${filter === f.key ? 'active' : ''}`}
                                onClick={() => setFilter(f.key)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="issues-grid">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div className="skeleton-card" key={i}>
                                    <div className="skeleton-line" style={{ height: 16, width: '40%' }} />
                                    <div className="skeleton-line" style={{ height: 20, width: '80%' }} />
                                    <div className="skeleton-line" style={{ height: 14, width: '100%' }} />
                                    <div className="skeleton-line" style={{ height: 14, width: '65%' }} />
                                </div>
                            ))
                        ) : filtered.length === 0 ? (
                            <div className="empty-state">
                                <span className="empty-icon">📭</span>
                                <p>No issues found</p>
                                <p style={{ fontSize: 13, color: '#334155' }}>
                                    {filter === 'all' ? 'Tap + to report the first issue.' : `No issues with status "${filter}".`}
                                </p>
                            </div>
                        ) : (
                            filtered.map(issue => <IssueCard key={issue._id} issue={issue} />)
                        )}
                    </div>
                </main>

                {/* FAB */}
                <button
                    id="new-issue-fab"
                    className="fab"
                    onClick={() => setShowModal(true)}
                    aria-label="Create new issue"
                    title="New Issue"
                >
                    +
                </button>

                {/* Modal */}
                {showModal && (
                    <NewIssueModal
                        onClose={() => setShowModal(false)}
                        onCreated={fetchIssues}
                    />
                )}
        </div>
    );
};

export default Issue;