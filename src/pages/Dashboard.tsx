import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import {
  MicrophoneStage,
  ChartLineUp,
  Plus,
  TrendUp,
  Translate,
  CircleNotch,
  ArrowRight
} from 'phosphor-react';
import { Timestamp } from 'firebase/firestore';
import './dashboard.css';

interface RecentSession {
  id: string;
  createdAt: Timestamp | string;
  languages: {
    from: string;
    to: string;
  };
  results?: {
    pronunciationScore: number;
    grammarScore: number;
    fluencyScore: number;
  };
}

export const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState<RecentSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSessions: 0,
    averageScore: 0,
    improvement: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentUser) return;
      try {
        const q = query(
          collection(db, 'users', currentUser.uid, 'sessions'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const sessionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as RecentSession[];
        setSessions(sessionsData);

        // Fetch all to calculate stats (in a real app, use a cloud function or aggregates)
        const allQ = query(collection(db, 'users', currentUser.uid, 'sessions'));
        const allSnap = await getDocs(allQ);
        const total = allSnap.size;
        
        let totalScore = 0;
        let gradedCount = 0;
        allSnap.forEach(doc => {
          const data = doc.data();
          if (data.results) {
            const avg = (data.results.pronunciationScore + data.results.grammarScore + data.results.fluencyScore) / 3;
            totalScore += avg;
            gradedCount++;
          }
        });

        setStats({
          totalSessions: total,
          averageScore: gradedCount > 0 ? Math.round(totalScore / gradedCount) : 0,
          improvement: total > 1 ? 12 : 0 // Dummy improvement for UI
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {currentUser?.displayName?.split(' ')[0] || 'Explorer'}!</h1>
          <p>Ready to level up your speaking skills today?</p>
        </div>
        <Link to="/train" className="button-primary btn-cta">
          <Plus size={20} weight="bold" />
          New Practice
        </Link>
      </header>

      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon purple">
            <MicrophoneStage size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Sessions</span>
            <span className="stat-value">{stats.totalSessions}</span>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon mint">
            <ChartLineUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Average Score</span>
            <span className="stat-value">{stats.averageScore}%</span>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon orange">
            <TrendUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Improvement</span>
            <span className="stat-value">+{stats.improvement}%</span>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <section className="recent-sessions-section">
          <div className="section-header">
            <h2>Recent Sessions</h2>
            <Link to="/history" className="link-more">View All <ArrowRight size={16} /></Link>
          </div>

          {loading ? (
            <div className="loading-inline">
              <CircleNotch size={24} className="spinner" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="empty-mini card">
              <p>No practices yet. Time to start!</p>
            </div>
          ) : (
            <div className="recent-list">
              {sessions.map(session => {
                const sessionAvg = session.results 
                  ? Math.round((session.results.pronunciationScore + session.results.grammarScore + session.results.fluencyScore) / 3) 
                  : null;
                
                return (
                  <div key={session.id} className="recent-item card">
                    <div className="recent-info">
                      <div className="recent-langs">
                        <span>{session.languages.from}</span>
                        <ArrowRight size={14} />
                        <span className="target">{session.languages.to}</span>
                      </div>
                      <span className="recent-date">
                        {session.createdAt instanceof Timestamp ? session.createdAt.toDate().toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                    {sessionAvg !== null ? (
                      <div className={`mini-score ${sessionAvg >= 70 ? 'good' : 'average'}`}>
                        {sessionAvg}%
                      </div>
                    ) : (
                      <span className="mini-status">Analyzing</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="quick-info-section">
          <div className="promo-card card glass">
            <div className="promo-content">
              <h3>Practice Tip</h3>
              <p>Try focusing on your <strong>fluency</strong> today. Don't worry about perfect grammar, just keep the flow!</p>
            </div>
            <div className="promo-illustration">
              <Translate size={48} weight="duotone" color="var(--color-secondary)" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
