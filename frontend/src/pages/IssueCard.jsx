import StatusBadge from "../components/StatusBadge";

const CATEGORY_ICONS = {
    wifi:        '📶',
    electricity: '⚡',
    water:       '💧',
    other:       '🔧',
};

const IssueCard = ({ issue }) => (
    <div className="issue-card">
        <div className="issue-card-header">
            <span className="issue-category-icon">{CATEGORY_ICONS[issue.category] || '🔧'}</span>
            <StatusBadge status={issue.status} />
        </div>
        <h3 className="issue-title">{issue.title}</h3>
        <p className="issue-desc">{issue.description}</p>
        <div className="issue-meta">
            <span className="issue-reporter">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                {issue.reporter?.username || 'Unknown'}
            </span>
            <span className="issue-date">
                {new Date(issue.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </span>
        </div>
    </div>
);

export default IssueCard;