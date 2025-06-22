'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function GameOverPage() {
  const searchParams = useSearchParams();
  const [score, setScore] = useState<string>('0');

  useEffect(() => {
    // Ambil nilai score saat komponen sudah mount
    const scoreFromURL = searchParams.get('score') ?? '0';
    setScore(scoreFromURL);

    // Mainkan suara game over
    const sound = new Audio('/sounds/game-over.wav');
    sound.volume = 0.8;
    sound.play().catch((e) => console.warn('Autoplay blocked:', e));
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 text-center px-4">
      <h1 className="text-5xl font-bold text-center text-red-800 drop-shadow-lg mb-8">Game Over!</h1>
      <p className="text-5xl font-bold text-center text-yellow-300 drop-shadow-lg mb-8">
        Your Score: <strong>{score}</strong>
      </p>

      <Link href="/game" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg mb-3 w-full max-w-xs text-center">
        Play Again
      </Link>
      <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full text-lg w-full max-w-xs text-center">
        Back to Home
      </Link>
    </div>
  );
}
