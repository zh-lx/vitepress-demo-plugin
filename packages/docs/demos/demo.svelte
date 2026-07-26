<script>
  let count = $state(0);
</script>

<div class="svelte-demo">
  <h3>Svelte Counter</h3>
  <p>Current count: {count}</p>
  <button onclick={() => count++}>Increment</button>
  <button onclick={() => count--}>Decrement</button>
</div>

<style>
  .svelte-demo {
    padding: 12px;
    font-family: sans-serif;
  }
  .svelte-demo h3 {
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
