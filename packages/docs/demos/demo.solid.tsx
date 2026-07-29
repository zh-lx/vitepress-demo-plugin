/** @jsxImportSource solid-js */
import { createSignal } from 'solid-js';

export default function Demo() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="solid-demo">
      <h2>This is a Solid Counter</h2>
      <button onClick={() => setCount(count() + 1)}>+1</button>
      <button onClick={() => setCount(count() - 1)}>-1</button>
      <p>Current count: {count()}</p>
      <style>{`
        .solid-demo {
          font-family: sans-serif;
        }
        .solid-demo h2 {
          color: #446b9e;
        }
        .solid-demo button {
          margin-right: 8px;
          padding: 6px 16px;
          border: 1px solid #446b9e;
          border-radius: 4px;
          background: white;
          color: #446b9e;
          cursor: pointer;
        }
        .solid-demo button:hover {
          background: #446b9e;
          color: white;
        }
      `}</style>
    </div>
  );
}
