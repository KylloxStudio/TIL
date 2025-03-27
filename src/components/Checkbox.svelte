<script>
  export let label = "";
  export let isChecked = false;
  export let onClickMethod;

  function toggle() {
    isChecked = !isChecked;
    if (onClickMethod != null) onClickMethod();
  }
</script>

<style>
  .checkbox-container {
      display: flex;
      align-items: center;
  }

  .checkbox-label {
      margin-right: 4px;
  }
</style>

<div class="checkbox-container">
  <button class="checkbox-label" on:click={toggle}>{label}</button>
  <input type="checkbox" bind:checked={isChecked} on:click={toggle} />
</div>