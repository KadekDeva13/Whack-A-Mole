'use client';
import { useEffect, useState } from 'react';

type MoleGridProps = {
  onGameOver: (score: number) => void;
};

export default function MoleGrid({ onGameOver }: MoleGridProps) {
  const [moleIndex, setMoleIndex] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    const countdown = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    const moleInterval = setInterval(() => {
      setMoleIndex(Math.floor(Math.random() * 9));
    }, 800);

    return () => {
      clearInterval(countdown);
      clearInterval(moleInterval);
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onGameOver(score);
    }
  }, [timeLeft, score, onGameOver]);

  const handleClick = (index: number) => {
    if (index === moleIndex) {
      setScore((prev) => prev + 1);
      setMoleIndex(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
<div className="flex flex-col items-center mb-4">
  <h2 className="text-2xl font-bold text-blue-900">Time Left: {timeLeft}s</h2>
  <h2 className="text-2xl font-bold text-blue-900">Score: {score}</h2>
</div>

      <div className="grid grid-cols-3 gap-3">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`w-24 h-24 rounded-md flex items-center justify-center cursor-pointer text-3xl transition-all duration-150 ${
              i === moleIndex ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300'
            }`}
            onClick={() => handleClick(i)}
          >
            {i === moleIndex ? '🐹' : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
