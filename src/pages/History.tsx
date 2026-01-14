import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { 
  Calendar, 
  ArrowRight, 
  CircleNotch,
  MicrophoneStage
} from 'phosphor-react';
import { Timestamp } from 'firebase/firestore';
import './history.css';

interface Session {
  id: string;
  createdAt: Timestamp | string;
  status: string;
  languages: {
    from: string;
    to: string;
  };
  results?: {
    pronunciationScore: number;
    grammarScore: number;
    fluencyScore: number;
    feedback: string;
  };
}

export const History: React.FC = () => {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!currentUser) return;
      try {
        const q = query(
          collection(db, 'users', currentUser.uid, 'sessions'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const sessionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Session[];
        setSessions(sessionsData);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [currentUser]);

  const getAverageScore = (results?: Session['results']) => {
    if (!results) return null;
    return Math.round((results.pronunciationScore + results.grammarScore + results.fluencyScore) / 3);
  };

  const formatDate = (timestamp: Timestamp | string) => {
    if (!timestamp) return 'N/A';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="history-container">
      <header className="page-header">
        <h1>Practice History</h1>
        <p>Review your previous sessions and track your improvement.</p>
      </header>

      {loading ? (
        <div className="loading-state">
          <CircleNotch size={40} className="spinner" />
          <p>Loading your progress...</p>
        </div>
      ) : sessions.length === 0 ? (
        <div className="empty-state card">
          <MicrophoneStage size={64} weight="light" />
          <h3>No sessions yet</h3>
          <p>Start your first practice session to see your progress here.</p>
        </div>
      ) : (
        <div className="sessions-list">
          {sessions.map(session => {
            const score = getAverageScore(session.results);
            return (
              <div key={session.id} className="session-card card">
                <div className="session-main">
                  <div className="session-date">
                    <Calendar size={18} />
                    <span>{formatDate(session.createdAt)}</span>
                  </div>
                  
                  <div className="session-langs">
                    <span className="lang-tag">{session.languages.from}</span>
                    <ArrowRight size={16} />
                    <span className="lang-tag target">{session.languages.to}</span>
                  </div>
                </div>

                <div className="session-stats">
                  {score !== null ? (
                    <div className={`score-badge ${score >= 70 ? 'good' : score >= 40 ? 'average' : 'poor'}`}>
                      {score}%
                    </div>
                  ) : (
                    <span className="status-tag analyzing">Analyzing...</span>
                  )}
                  
                  <button className="btn-view-details">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
