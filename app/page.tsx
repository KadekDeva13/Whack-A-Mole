'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [highScore, setHighScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedHigh = parseInt(localStorage.getItem('highScore') || '0');
    setHighScore(storedHigh);

    const storedBoard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    setLeaderboard(storedBoard);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-center px-4">
      <h1 className="text-5xl font-bold text-green-800 mb-4">🐹 Whack-a-Mole!</h1>

      <p className="text-lg text-gray-700 mb-2">🏆 High Score: {highScore}</p>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">🏅 Leaderboard:</h2>
        <ul className="text-left">
          {leaderboard.length === 0 ? (
            <li className="text-gray-500">Belum ada skor</li>
          ) : (
            leaderboard.map((score, idx) => (
              <li key={idx} className="text-gray-800">#{idx + 1} - {score}</li>
            ))
          )}
        </ul>
      </div>

      <button
        onClick={() => router.push('/game')}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg mb-4 w-full max-w-xs"
      >
        Start Game
      </button>

      <button
        onClick={() => window.close()}
        className="bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-full text-lg w-full max-w-xs"
      >
        Quit
      </button>
    </div>
  );
}
