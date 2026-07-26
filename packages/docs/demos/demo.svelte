<script>
  let count = $state(0);
</script>

<div class="svelte-demo">
  <h2>This is a Svelte Counter</h2>
  <button onclick={() => count++}>+1</button>
  <button onclick={() => count--}>-1</button>
  <p>Current count: {count}</p>
</div>

<style>
  .svelte-demo {
    font-family: sans-serif;
  }
  .svelte-demo h2 {
    color: #ff3e00;
  }
  .svelte-demo button {
    margin-right: 8px;
    padding: 6px 16px;
    border: 1px solid #ff3e00;
    border-radius: 4px;
    background: white;
    color: #ff3e00;
    cursor: pointer;
  }
  .svelte-demo button:hover {
    background: #ff3e00;
    color: white;
  }
</style>
