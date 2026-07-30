<script>
  let count = $state(0);
</script>

<div class="vp-demo-svelte">
  <div class="title">
    This is a <span class="framework">Svelte</span> Demo
  </div>
  <div class="btn-container">
    <button class="btn" onclick={() => count++}>+1</button>
    <button class="btn" onclick={() => count--}>-1</button>
  </div>
  <div>Current count: {count}</div>
</div>

<style>
  .vp-demo-svelte {
    font-family: 'PingFang SC', 'Microsoft YaHei', 'SimHei', 'SimSun',
      'sans-serif';
    font-size: 14px;
    line-height: 20px;
  }
  .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
  }
  .framework {
    color: #FF3E00;
  }
  .btn-container {
    display: flex;
    align-items: center;
    column-gap: 24px;
  }
  .btn {
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
</style>
