import { useState } from 'react';
import { createIssue } from '../api/issues.api';

const NewIssueModal = ({ onClose, onCreated }) => {
    const [form, setForm] = useState({ title: '', description: '', category: 'other' });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const fd = new FormData(); // It's provided by the browser's JavaScript environment.
            fd.append('title', form.title);
            fd.append('description', form.description);
            fd.append('category', form.category);
            if (image) fd.append('image', image);
            await createIssue(fd);
            onCreated();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create issue.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>New Issue</h2>
                    <button className="modal-close" onClick={onClose} aria-label="Close">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {error && <div className="modal-error">{error}</div>}

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input name="title" value={form.title} onChange={handleChange} placeholder="Brief issue title" required maxLength={100} />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the issue in detail..." required maxLength={500} rows={4} />
                        <span className="char-count">{form.description.length}/500</span>
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" value={form.category} onChange={handleChange}>
                            <option value="wifi">📶 WiFi</option>
                            <option value="electricity">⚡ Electricity</option>
                            <option value="water">💧 Water</option>
                            <option value="other">🔧 Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Attach Image <span className="optional">(optional)</span></label>
                        <label className="file-upload-label">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            {image ? image.name : 'Choose file…'}
                            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={{ display: 'none' }} />
                        </label>
                    </div>

                    <button type="submit" className="modal-submit" disabled={loading}>
                        {loading ? <span className="spinner" /> : 'Submit Issue'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewIssueModal;