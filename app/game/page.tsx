'use client';
import MoleGrid from '../components/MoleGrid';
import { useRouter } from 'next/navigation';

export default function GamePage() {
  const router = useRouter();

  const handleGameOver = (score: number) => {
    router.push(`/game-over?score=${score}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <MoleGrid onGameOver={handleGameOver} />
    </div>
  );
}
