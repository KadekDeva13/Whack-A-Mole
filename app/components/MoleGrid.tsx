'use client';
import { useEffect, useState } from 'react';

type MoleGridProps = {
  onGameOver: (score: number) => void;
  bgMusic?: HTMLAudioElement | null; // menerima musik dari parent
};

export default function MoleGrid({ onGameOver, bgMusic }: MoleGridProps) {
  const [moleIndex, setMoleIndex] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

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
      if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
      }
      onGameOver(score);
    }
  }, [timeLeft]);

  const handleClick = (index: number) => {
    if (index === moleIndex) {
      setScore((prev) => prev + 1);
      setMoleIndex(null);
      new Audio('/sounds/pop.mp3').play(); // langsung trigger suara baru tanpa delay
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Progress Bar */}
      <div className="w-full max-w-xs sm:max-w-md bg-gray-300 h-3 sm:h-4 rounded-full mb-4 overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-1000"
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        />
      </div>

      {/* Time and Score */}
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">
          Time Left: {timeLeft}s
        </h2>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">
          Score: {score}
        </h2>
      </div>

      {/* Mole Grid */}
      <div className="grid grid-cols-3 gap-3">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-md flex items-center justify-center cursor-pointer text-3xl sm:text-4xl md:text-5xl transition-all duration-150 ${
              i === moleIndex
                ? 'bg-yellow-500 hover:bg-yellow-600 scale-110'
                : 'bg-gray-300'
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
