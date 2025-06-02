'use client';                         // ← wichtig, sonst läuft useState nicht

import { useState } from 'react';

export default function HelloButton() {
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch('/api/hello');          // 1. API call
      if (!res.ok) throw new Error('Fetch failed');
      const data: { message: string } = await res.json();  // 2. JSON → data
      setMsg(data.message);                           // 3. State setzen
    } catch (err) {
      console.error(err);
      setMsg('Fehler beim Laden');
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={load}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Sag&nbsp;Hallo&nbsp;(API)
      </button>

      {msg && <p className="text-green-700">{msg}</p>}
    </div>
  );
}
