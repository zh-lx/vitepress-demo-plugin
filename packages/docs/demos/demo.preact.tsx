/** @jsxImportSource preact */
import { useState } from 'preact/hooks';

export default function Demo() {
  const [count, setCount] = useState(0);

  return (
    <div class="vp-demo-preact">
      <div class="title">
        This is a <span class="framework">Preact</span> Demo
      </div>
      <div class="btn-container">
        <button class="btn" onClick={() => setCount(count + 1)}>
          +1
        </button>
        <button class="btn" onClick={() => setCount(count - 1)}>
          -1
        </button>
      </div>
      <div>Current count: {count}</div>
      <style>{`
        .vp-demo-preact { font-family: sans-serif; font-size: 14px; line-height: 20px; }
        .vp-demo-preact .title { font-size: 24px; font-weight: 600; line-height: 32px; margin-bottom: 12px; }
        .vp-demo-preact .framework { color: #673ab8; }
        .vp-demo-preact .btn-container { display: flex; align-items: center; column-gap: 24px; margin-bottom: 12px; }
        .vp-demo-preact .btn { cursor: pointer; background-color: #007bff; color: #fff; border: none; border-radius: 4px; padding: 6px 16px; font-size: 14px; }
      `}</style>
    </div>
  );
}
