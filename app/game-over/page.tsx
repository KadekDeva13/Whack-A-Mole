'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GameOverPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = searchParams.get('score') || '0';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 text-center px-4">
      <h1 className="text-5xl font-bold text-center text-red-800 drop-shadow-lg mb-8">Game Over!</h1>
      <p className="text-5xl font-bold text-center text-yellow-300 drop-shadow-lg mb-8">Your Score: <strong>{score}</strong></p>
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg mb-3 w-full max-w-xs"
        onClick={() => router.push('/game')}
      >
        Play Again
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full text-lg w-full max-w-xs"
        onClick={() => router.push('/')}
      >
        Back to Home
      </button>
    </div>
  );
}
