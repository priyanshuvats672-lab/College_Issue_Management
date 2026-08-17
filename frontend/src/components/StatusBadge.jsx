const STATUS_CONFIG = {
    open:        { label: 'Open',        color: '#6366f1', bg: 'rgba(99,102,241,0.12)'  },
    assigned:    { label: 'Assigned',    color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
    in_progress: { label: 'In Progress', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)'  },
    resolved:    { label: 'Resolved',    color: '#10b981', bg: 'rgba(16,185,129,0.12)'  },
};

const StatusBadge = ({ status }) => {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.open;
    return (
        <span style={{
            background: cfg.bg,
            color: cfg.color,
            border: `1px solid ${cfg.color}44`,
            padding: '2px 10px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
        }}>
            {cfg.label}
        </span>
    );
};

export default StatusBadge;