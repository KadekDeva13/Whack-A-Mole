'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function GameOverClient() {
  const searchParams = useSearchParams();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewHigh, setIsNewHigh] = useState(false);

  useEffect(() => {
    const scoreFromURL = parseInt(searchParams.get('score') || '0');
    setScore(scoreFromURL);

    const storedHigh = parseInt(localStorage.getItem('highScore') || '0');
    if (scoreFromURL > storedHigh) {
      localStorage.setItem('highScore', scoreFromURL.toString());
      setHighScore(scoreFromURL);
      setIsNewHigh(true);
    } else {
      setHighScore(storedHigh);
      setIsNewHigh(false);
    }

    const storedBoard = JSON.parse(localStorage.getItem('leaderboard') || '[]') as number[];
    const updated = [...storedBoard, scoreFromURL]
      .sort((a, b) => b - a)
      .slice(0, 5);
    localStorage.setItem('leaderboard', JSON.stringify(updated));

    const sound = new Audio('/sounds/game-over.wav');
    sound.volume = 0.5;
    sound.play().catch((e) => console.warn('Autoplay blocked:', e));
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 text-center px-4">
      <h1 className="text-5xl font-bold text-center text-red-800 drop-shadow-lg mb-4">
        Game Over!
      </h1>

      <p className="text-4xl font-bold text-center text-yellow-300 drop-shadow-lg mb-2">
        Your Score: <strong>{score}</strong>
      </p>

      <p className="text-xl text-gray-700 mb-4">
        High Score: <strong>{highScore}</strong>
      </p>

      {isNewHigh && (
        <p className="text-lg font-semibold text-green-700 mb-4 animate-bounce">
          🎉 New High Score!
        </p>
      )}

      <Link
        href="/game"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg mb-3 w-full max-w-xs text-center"
      >
        Play Again
      </Link>
      <Link
        href="/"
        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full text-lg w-full max-w-xs text-center"
      >
        Back to Home
      </Link>
    </div>
  );
}
