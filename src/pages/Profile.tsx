import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { User, Translate, Microphone } from 'phosphor-react';
import './profile.css';

interface UserProfile {
  displayName: string;
  nativeLanguage: string;
  targetLanguage: string;
  voicePreference: string;
}

export const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [profile, setProfile] = useState<UserProfile>({
    displayName: '',
    nativeLanguage: 'pt-BR',
    targetLanguage: 'en-US',
    voicePreference: 'neutral'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;
      
      try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            displayName: data.profile.displayName || currentUser.displayName || '',
            nativeLanguage: data.profile.nativeLanguage || 'pt-BR',
            targetLanguage: data.profile.targetLanguage || 'en-US',
            voicePreference: data.profile.voicePreference || 'neutral'
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await updateDoc(docRef, {
        'profile.displayName': profile.displayName,
        'profile.nativeLanguage': profile.nativeLanguage,
        'profile.targetLanguage': profile.targetLanguage,
        'profile.voicePreference': profile.voicePreference
      });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <header className="page-header">
        <h1>Settings</h1>
        <p>Manage your account and preferences</p>
      </header>

      {message.text && (
        <div className={`status-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleUpdate} className="profile-form">
        <section className="settings-section">
          <div className="section-title">
            <User size={24} weight="bold" />
            <h2>Personal Information</h2>
          </div>
          <div className="form-group">
            <label>Display Name</label>
            <input
              type="text"
              value={profile.displayName}
              onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
              placeholder="Your Name"
            />
          </div>
        </section>

        <section className="settings-section">
          <div className="section-title">
            <Translate size={24} weight="bold" />
            <h2>Language Preferences</h2>
          </div>
          <div className="grid-2-cols">
            <div className="form-group">
              <label>Native Language</label>
              <select 
                value={profile.nativeLanguage}
                onChange={(e) => setProfile({ ...profile, nativeLanguage: e.target.value })}
              >
                <option value="pt-BR">Portuguese (Brazil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Spanish</option>
              </select>
            </div>
            <div className="form-group">
              <label>Target Language</label>
              <select
                value={profile.targetLanguage}
                onChange={(e) => setProfile({ ...profile, targetLanguage: e.target.value })}
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Spanish</option>
                <option value="pt-BR">Portuguese (Brazil)</option>
              </select>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <div className="section-title">
            <Microphone size={24} weight="bold" />
            <h2>AI Voice Configuration</h2>
          </div>
          <div className="form-group">
            <label>Preferred AI Voice</label>
            <select
              value={profile.voicePreference}
              onChange={(e) => setProfile({ ...profile, voicePreference: e.target.value })}
            >
              <option value="neutral">Neural Neutral</option>
              <option value="male_1">Masculine - Standard</option>
              <option value="female_1">Feminine - Professional</option>
              <option value="casual_1">Casual/Regional</option>
            </select>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="button-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
