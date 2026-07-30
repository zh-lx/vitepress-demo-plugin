/** @jsxImportSource solid-js */
import { createSignal } from 'solid-js';

export default function Demo() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="vp-demo-solid">
      <div class="title">
        This is a <span class="framework">Solid</span> Demo
      </div>
      <div class="btn-container">
        <button class="btn" onClick={() => setCount(count() + 1)}>
          +1
        </button>
        <button class="btn" onClick={() => setCount(count() - 1)}>
          -1
        </button>
      </div>
      <div>Current count: {count()}</div>
      <style>{`
        .vp-demo-solid {
          font-family: 'PingFang SC', 'Microsoft YaHei', 'SimHei', 'SimSun', sans-serif;
          font-size: 14px;
          line-height: 20px;
        }
        .vp-demo-solid .title {
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
        }
        .vp-demo-solid .framework {
          color: #446b9e;
        }
        .vp-demo-solid .btn-container {
          display: flex;
          align-items: center;
          column-gap: 24px;
        }
        .vp-demo-solid .btn {
          cursor: pointer;
          background-color: #007bff;
          color: #fff;
          border: none;
          font-size: 14px;
          border-radius: 4px;
          line-height: 20px;
          padding: 4px 16px;
          margin: 12px 0;
        }
      `}</style>
    </div>
  );
}
