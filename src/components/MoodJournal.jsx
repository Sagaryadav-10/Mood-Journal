// src/components/MoodJournal.jsx
import React, { useState, useEffect } from "react";

const moods = ["😊 Happy", "😔 Sad", "😠 Angry", "😌 Calm", "🤯 Stressed"];

const MoodJournal = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [moodLog, setMoodLog] = useState(() => {
    const stored = localStorage.getItem("moodLog");
    return stored ? JSON.parse(stored) : [];
  });

  const handleAddMood = () => {
    if (!selectedMood) return;
    const entry = {
      id: Date.now(),
      mood: selectedMood,
      note,
      date: new Date().toLocaleDateString(),
    };
    const updatedLog = [entry, ...moodLog];
    setMoodLog(updatedLog);
    localStorage.setItem("moodLog", JSON.stringify(updatedLog));
    setNote("");
    setSelectedMood("");
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <img src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="Mood Icon" style={styles.logo} />
          <h1 style={styles.heading}>Mood Journal</h1>
        </div>

        <div style={styles.card}>
          <h3 style={styles.label}>Select your mood:</h3>
          <div style={styles.moodButtons}>
            {moods.map((mood) => (
              <button
                key={mood}
                style={{
                  ...styles.moodButton,
                  backgroundColor: selectedMood === mood ? "#94d2bd" : "#f0efeb",
                  color: selectedMood === mood ? "#fff" : "#333",
                  transform: selectedMood === mood ? "scale(1.05)" : "scale(1)",
                }}
                onClick={() => setSelectedMood(mood)}
              >
                {mood}
              </button>
            ))}
          </div>

          <textarea
            placeholder="Note of the Day..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="3"
            style={styles.textarea}
          />

          <button
            onClick={handleAddMood}
            disabled={!selectedMood}
            style={{
              ...styles.saveButton,
              opacity: selectedMood ? 1 : 0.5,
              cursor: selectedMood ? "pointer" : "not-allowed",
            }}
          >
            Save Mood
          </button>
        </div>

        <div style={styles.historySection}>
          <h2 style={styles.subheading}>📅 Your Mood History</h2>
          {moodLog.length === 0 ? (
            <p style={{ textAlign: "center", color: "#999" }}>No entries yet.</p>
          ) : (
            moodLog.map((entry) => (
              <div key={entry.id} style={styles.entryCard}>
                <div style={styles.entryHeader}>
                  <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{entry.mood}</span>
                  <span style={{ color: "#777" }}>{entry.date}</span>
                </div>
                {entry.note && (
                  <p style={{ marginTop: "0.5rem", color: "#333" }}>📝 {entry.note}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    padding: "2rem 1rem",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#333",
  },
  header: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  logo: {
    width: "60px",
    marginBottom: "0.5rem",
  },
  heading: {
    fontSize: "2rem",
    margin: 0,
  },
  card: {
    backgroundColor: "lightpink",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "600",
  },
  moodButtons: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
    gap: "10px",
    paddingBottom: "1rem",
  },
  moodButton: {
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    border: "1px solid #ccc",
    backgroundColor: "#f0efeb",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
    resize: "none",
    fontSize: "1rem",
    fontFamily: "inherit",
  },
  saveButton: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "8px",
    backgroundColor: "#5fb49c",
    color: "#fff",
    border: "none",
    transition: "0.3s ease",
  },
  historySection: {
    marginTop: "1rem",
  },
  subheading: {
    marginBottom: "1rem",
    fontSize: "1.3rem",
    textAlign: "center",
  },
  entryCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    padding: "1rem",
    marginBottom: "1rem",
    border: "1px solid #eee",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  entryHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default MoodJournal;