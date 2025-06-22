import { Suspense } from 'react';
import GameOverClient from './GameOverClient';

export default function GameOverPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GameOverClient />
    </Suspense>
  );
}
