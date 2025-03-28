<script>
  import "../app.css";
  import "../globals.css";

  import { onMount } from "svelte";
  import Navigation from "../components/Navigation.svelte";

  onMount(() => {
    document.querySelector(".wait").style.opacity = 0;
    setTimeout(() => {
      document.querySelector(".wait").style.display = "none";
    }, 1000);
  });
</script>

<style>
  main {
    width: 100%;
    min-height: 100vh;
  }

  .wait {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #ffffff;
    transition: all 0.8s;
    z-index: 99999;
  }

  .animated {
    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    -o-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    -moz-animation-fill-mode: both;
    -o-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .animated.fadeIn {
    -webkit-animation-name: fadeIn;
    -moz-animation-name: fadeIn;
    -o-animation-name: fadeIn;
    animation-name: fadeIn;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @media (max-width: 578px) {
    main {
      flex-direction: column;
    }
  }
</style>

<Navigation></Navigation>
<main class="animated fadeIn">
  <div class="wait"></div>

  <slot></slot>
</main>
