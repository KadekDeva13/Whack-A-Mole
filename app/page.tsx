'use client';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-center px-4">
      <h1 className="text-5xl font-bold text-center text-green-800 drop-shadow-lg mb-8">
        🐹 Whack-a-Mole!
      </h1>


      <button
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg mb-4 w-full max-w-xs"
        onClick={() => router.push('/game')}
      >
        Start Game
      </button>
      <button
        className="bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-full text-lg w-full max-w-xs"
        onClick={() => alert('Thanks for playing!')}
      >
        Quit
      </button>
    </div>
  );
}
