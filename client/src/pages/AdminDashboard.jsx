import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState('courts');
    const [courts, setCourts] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [courtsRes, submissionsRes] = await Promise.all([
                api.get('/admin/courts'),
                api.get('/admin/submissions')
            ]);
            
            if (courtsRes.data.success) setCourts(courtsRes.data.data);
            if (submissionsRes.data.success) setSubmissions(submissionsRes.data.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleApprove = async (id) => {
        if (!confirm('Approve this submission?')) return;
        
        try {
            const { data } = await api.post(`/admin/submissions/${id}/approve`);
            if (data.success) {
                fetchData(); // Refresh data
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to approve');
        }
    };

    const handleDecline = async (id) => {
        if (!confirm('Decline and delete this submission?')) return;
        
        try {
            const { data } = await api.delete(`/admin/submissions/${id}/decline`);
            if (data.success) {
                setSubmissions(submissions.filter(s => s.id !== id));
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to decline');
        }
    };

    const handleDeleteCourt = async (id) => {
        if (!confirm('Are you sure you want to delete this court?')) return;
        
        try {
            const { data } = await api.delete(`/admin/courts/${id}`);
            if (data.success) {
                setCourts(courts.filter(c => c.id !== id));
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete court');
        }
    };

    return (
        <div className="admin-dashboard">
            {/* Admin Header */}
            <header className="admin-header">
                <div className="admin-header-content">
                    <h1>🏓 Admin Dashboard</h1>
                    <div className="admin-user-info">
                        <span>Welcome, {user?.username} ({user?.role})</span>
                        <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Admin Navigation */}
            <nav className="admin-nav">
                <button 
                    className={`admin-nav-btn ${activeTab === 'courts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('courts')}
                >
                    Courts ({courts.length})
                </button>
                <button 
                    className={`admin-nav-btn ${activeTab === 'submissions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('submissions')}
                >
                    Pending Submissions ({submissions.length})
                </button>
            </nav>

            {/* Main Content */}
            <main className="admin-main">
                {loading ? (
                    <div className="admin-loading">Loading...</div>
                ) : activeTab === 'courts' ? (
                    <div className="admin-section">
                        <div className="section-header">
                            <h2>Manage Courts</h2>
                        </div>
                        
                        {courts.length === 0 ? (
                            <p className="empty-message">No courts yet.</p>
                        ) : (
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Venue Name</th>
                                            <th>Location</th>
                                            <th>Courts</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courts.map((court) => (
                                            <tr key={court.id}>
                                                <td>{court.id}</td>
                                                <td>{court.venue_name}</td>
                                                <td>{court.location}</td>
                                                <td>{court.number_of_courts}</td>
                                                <td>{court.price || '-'}</td>
                                                <td className="actions-cell">
                                                    <button 
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteCourt(court.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="admin-section">
                        <div className="section-header">
                            <h2>Pending Submissions</h2>
                        </div>
                        
                        {submissions.length === 0 ? (
                            <p className="empty-message">No pending submissions.</p>
                        ) : (
                            <div className="submissions-list">
                                {submissions.map((submission) => (
                                    <div key={submission.id} className="submission-card">
                                        <div className="submission-info">
                                            <h3>{submission.venue_name}</h3>
                                            <p><strong>Location:</strong> {submission.location}</p>
                                            <p><strong>Courts:</strong> {submission.number_of_courts}</p>
                                            {submission.price && <p><strong>Price:</strong> {submission.price}</p>}
                                            <p className="submission-date">
                                                Submitted: {new Date(submission.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="submission-actions">
                                            <button 
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleApprove(submission.id)}
                                            >
                                                ✓ Approve
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDecline(submission.id)}
                                            >
                                                ✗ Decline
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
