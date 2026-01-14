import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Translate, TextT, Robot, Play, ArrowLeft, MicrophoneStage } from 'phosphor-react';
import { generateScript, analyzeSpeech } from '../services/gemini';
import type { AnalysisResult } from '../services/gemini';
import './new-training.css';

import { useNavigate } from 'react-router-dom';
import { uploadAudio } from '../services/storage';

type Step = 'input' | 'preview' | 'practice' | 'results';

interface TrainingConfig {
  sourceLanguage: string;
  targetLanguage: string;
  tone: 'formal' | 'informal';
  summary: string;
}

export const NewTraining: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('input');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState('');
  const [script, setScript] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  
  const [config, setConfig] = useState<TrainingConfig>({
    sourceLanguage: 'pt-BR',
    targetLanguage: 'en-US',
    tone: 'formal',
    summary: '',
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    const fetchUserPrefs = async () => {
      if (!currentUser) return;
      try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.profile) {
            setConfig(prev => ({
              ...prev,
              sourceLanguage: data.profile.nativeLanguage || 'pt-BR',
              targetLanguage: data.profile.targetLanguage || 'en-US',
            }));
          }
        }
      } catch (err) {
        console.error("Error fetching user preferences:", err);
      }
    };
    fetchUserPrefs();
  }, [currentUser]);

  const handleGenerate = async () => {
    if (!config.summary.trim()) {
      setError('Please provide a summary or description of your presentation.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const generatedScript = await generateScript({
        text: config.summary,
        sourceLanguage: config.sourceLanguage,
        targetLanguage: config.targetLanguage,
        tone: config.tone,
      });
      setScript(generatedScript);
      setStep('preview');
    } catch (err) {
      setError('Failed to generate script. Please check your API key and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        await handleFinishSession(audioBlob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert("Error accessing microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setLoading(true); // Show loading while uploading
    }
  };

  const handleFinishSession = async (audioBlob: Blob) => {
    if (!currentUser) return;

    setLoading(true);
    try {
      // 1. Create initial session doc
      const sessionsRef = collection(db, 'users', currentUser.uid, 'sessions');
      const sessionDoc = await addDoc(sessionsRef, {
        createdAt: serverTimestamp(),
        scriptOriginal: config.summary,
        scriptTranslated: script,
        status: 'analyzing',
        languages: {
          from: config.sourceLanguage,
          to: config.targetLanguage
        }
      });

      // 2. Upload Audio to Storage
      const audioUrl = await uploadAudio(audioBlob, currentUser.uid, sessionDoc.id);

      // 3. Analyze Speech with Gemini
      const analysisResult = await analyzeSpeech(audioBlob, script, config.targetLanguage);
      setAnalysis(analysisResult);

      // 4. Update session doc with results
      await updateDoc(doc(db, 'users', currentUser.uid, 'sessions', sessionDoc.id), {
        audioUrl,
        results: analysisResult,
        status: 'completed'
      });

      setStep('results');
    } catch (err) {
      console.error("Error finalizing session:", err);
      alert("Failed to analyze recording. Please try again.");
      setStep('preview');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderInputStep = () => (
    <div className="training-step">
      <header className="page-header">
        <h1>New Presentation</h1>
        <p>Describe what you want to talk about, and AI will prepare your script.</p>
      </header>

      <section className="settings-section">
        <div className="section-title">
          <Translate size={24} weight="bold" />
          <h2>Language & Tone</h2>
        </div>
        <div className="grid-3-cols">
          <div className="form-group">
            <label>Source Language</label>
            <select 
              value={config.sourceLanguage}
              onChange={(e) => setConfig({ ...config, sourceLanguage: e.target.value })}
            >
              <option value="pt-BR">Portuguese (Brazil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Spanish</option>
            </select>
          </div>
          <div className="form-group">
            <label>Target Language</label>
            <select
              value={config.targetLanguage}
              onChange={(e) => setConfig({ ...config, targetLanguage: e.target.value })}
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish</option>
              <option value="pt-BR">Portuguese (Brazil)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tone</label>
            <select
              value={config.tone}
              onChange={(e) => setConfig({ ...config, tone: e.target.value as 'formal' | 'informal' })}
            >
              <option value="formal">Formal</option>
              <option value="informal">Informal</option>
            </select>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <div className="section-title">
          <TextT size={24} weight="bold" />
          <h2>Presentation Summary</h2>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Ex: I want to talk about the benefits of renewable energy for small businesses..."
            value={config.summary}
            onChange={(e) => setConfig({ ...config, summary: e.target.value })}
            rows={6}
            className="summary-textarea"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
      </section>

      <div className="form-actions">
        <button 
          onClick={handleGenerate} 
          className="button-primary btn-large" 
          disabled={loading}
        >
          {loading ? (
            <>
              <Robot size={24} className="animate-pulse" />
              Generating Script...
            </>
          ) : (
            <>
              <Robot size={24} />
              Generate Script
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderPreviewStep = () => (
    <div className="training-step">
      <header className="page-header">
        <button className="btn-back" onClick={() => setStep('input')}>
          <ArrowLeft size={20} /> Back
        </button>
        <h1>Generated Script</h1>
        <p>Review your translated script before starting the practice session.</p>
      </header>

      <section className="script-preview-card">
        <div className="script-content">
          {script.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div className="form-actions">
        <button 
          onClick={() => setStep('practice')} 
          className="button-primary btn-large"
        >
          <Play size={24} weight="fill" />
          Start Practice
        </button>
      </div>
    </div>
  );

  const renderPracticeStep = () => (
    <div className="teleprompter-step">
      <div className="teleprompter-header">
        <button className="btn-back-light" onClick={() => setStep('preview')} disabled={isRecording}>
          <ArrowLeft size={20} /> {isRecording ? 'Exit (Unavailable)' : 'Exit'}
        </button>
        <div className="recording-status">
            {isRecording && <div className="recording-indicator"></div>}
            <span className="timer">{formatTime(recordingTime)}</span>
        </div>
        <span className="teleprompter-badge">Practice Mode</span>
      </div>
      
      <div className="teleprompter-container">
        <div className={`teleprompter-content ${isRecording ? 'scrolling' : ''}`}>
          <div className="teleprompter-text">
             {script.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="teleprompter-controls">
         {!isRecording ? (
           <>
             <p className="hint">Ready? Click the button and start reading aloud.</p>
             <button onClick={startRecording} className="button-accent btn-large" disabled={loading}>
               <MicrophoneStage size={24} />
               Start Recording
             </button>
           </>
         ) : (
           <button onClick={stopRecording} className="button-stop btn-large">
             <div className="square-icon" />
             Stop and Finish
           </button>
         )}
      </div>
    </div>
  );

  const renderResultsStep = () => (
    <div className="training-step">
      <header className="page-header">
        <h1>Analysis Results</h1>
        <p>See how you performed in this practice session.</p>
      </header>

      {analysis && (
        <div className="results-grid">
          <div className="score-card main-score">
            <div className="score-value">{Math.round((analysis.pronunciationScore + analysis.fluencyScore + analysis.grammarScore) / 3)}</div>
            <div className="score-label">Overall Score</div>
          </div>

          <div className="score-details">
            <div className="score-item">
              <label>Pronunciation</label>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${analysis.pronunciationScore}%` }}></div>
              </div>
              <span>{analysis.pronunciationScore}%</span>
            </div>
            <div className="score-item">
              <label>Fluency</label>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${analysis.fluencyScore}%` }}></div>
              </div>
              <span>{analysis.fluencyScore}%</span>
            </div>
            <div className="score-item">
              <label>Grammar</label>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${analysis.grammarScore}%` }}></div>
              </div>
              <span>{analysis.grammarScore}%</span>
            </div>
          </div>
        </div>
      )}

      <section className="settings-section">
        <div className="section-title">
          <Robot size={24} weight="bold" color="var(--color-secondary)" />
          <h2>AI Feedback</h2>
        </div>
        <div className="feedback-content">
          {analysis?.feedback}
        </div>
      </section>

      <div className="form-actions">
        <button onClick={() => navigate('/')} className="button-primary btn-large">
          Done, Back to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="new-training-container">
      {loading && step !== 'practice' && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Processing Analysis...</p>
        </div>
      )}
      {step === 'input' && renderInputStep()}
      {step === 'preview' && renderPreviewStep()}
      {step === 'practice' && renderPracticeStep()}
      {step === 'results' && renderResultsStep()}
    </div>
  );
};
