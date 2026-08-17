const ROLE_COLORS = {
    admin:   { text: '#f472b6', bg: 'rgba(244,114,182,0.15)' },
    teacher: { text: '#818cf8', bg: 'rgba(129,140,248,0.15)' },
    student: { text: '#34d399', bg: 'rgba(52,211,153,0.15)'  },
};

const RoleBadge = ({ role }) => {
    const cfg = ROLE_COLORS[role] || ROLE_COLORS.student;
    return (
        <span style={{
            background: cfg.bg,
            color: cfg.text,
            border: `1px solid ${cfg.text}44`,
            padding: '3px 12px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
        }}>
            {role}
        </span>
    );
};

export default RoleBadge;