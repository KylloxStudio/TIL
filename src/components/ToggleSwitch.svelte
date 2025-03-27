<script>
  export let isChecked = false;
  export let onClickMethod;

  function toggle() {
    isChecked = !isChecked;
    if (onClickMethod != null) onClickMethod();
  }
</script>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
    margin-left: 4px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e4e4e7;
    border-width: 2px;
    border-color: transparent;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 250ms;
    border-radius: 24px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 0;
    bottom: 0;
    background-color: white;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 250ms;
    border-radius: 50%;
  }

  .check:checked + .slider {
    background-color: #18181b;
  }

  .check:checked + .slider:before {
    transform: translateX(24px);
  }

  @media (max-width: 578px) {
    .switch {
      width: 36px;
      height: 18px;
    }

    .slider:before {
      height: 14px;
      width: 14px;
    }

    .check:checked + .slider:before {
      transform: translateX(18px);
    }
  }
</style>

<label class="switch">
  <input class="check" type="checkbox" bind:checked={isChecked} on:click={toggle} />
  <span class="slider"></span>
</label>