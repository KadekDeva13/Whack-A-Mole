'use client';
import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import MoleGrid from '../components/MoleGrid';

export default function GamePage() {
  const router = useRouter();
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const music = new Audio('/sounds/Hypnotic-Puzzle.mp3');
    music.loop = true;
    music.volume = 0.4;

    music.play().then(() => {
      bgMusicRef.current = music;
    }).catch((e) => {
      console.warn('Autoplay blocked, will play on interaction.', e);
    });

    return () => {
      music.pause();
      music.currentTime = 0;
    };
  }, []);

  const handleGameOver = useCallback((score: number) => {
    router.push(`/game-over?score=${score}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <MoleGrid onGameOver={handleGameOver} bgMusic={bgMusicRef.current} />
    </div>
  );
}