import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
      setMode(newMode);
      setHistory(prev => {
        if (replace) {
          prev.pop();
        }
        const newHist = [...prev, newMode]
        return newHist
      });
    }

  function back() {
    if (history.length > 1){
      history.pop()
      setMode(history[history.length-1])
    }
    else {
      setMode(history[0])
    }
  }
  return { mode, transition, back }
}


