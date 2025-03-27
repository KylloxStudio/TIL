<script>
  import { onMount } from 'svelte';
  import { wait, enableScroll, disableScroll } from '../lib/functions.js';

  export let id;
  export let title;
  export let buttonName = "close";
  export let buttonEvent = null;

  onMount(() => {
    const openModalLinks = document.querySelectorAll(`.open-${id}`);
    openModalLinks.forEach((openModalLink) => {
      openModalLink.addEventListener('click', async (event) => {
        onClickModalOpen();
      });
    });

    const closeModalLinks = document.querySelectorAll('.modal-dismiss');
    closeModalLinks.forEach((closeModalLink) => {
      closeModalLink.addEventListener('click', async (event) => {
        onClickModalClose(event);
      });
    });

    document.querySelector(`#${id} .close`).addEventListener('click', async (event) => {
      event.preventDefault();
      if (buttonEvent == null) {
        const overlay = document.querySelector(`#${id} .modal-overlay`);
        const modal = document.querySelector(`#${id} .modal-container`);

        overlay.style.opacity = '0';
        modal.style.opacity = '0';
        modal.style.transform = "translateY(-100%)";
        await wait(100);
        overlay.style.display = 'none';
        modal.style.top = '0';

        enableScroll();
      } else {
        buttonEvent();
      }
    });
  });

  async function onClickModalOpen() {
    disableScroll();

    const overlay = document.querySelector(`#${id} .modal-overlay`);
    const modal = document.querySelector(`#${id} .modal-container`);

    overlay.style.display = 'block';
    overlay.style.height = document.body.scrollHeight.toString() + 'px';
    overlay.style.opacity = '1';

    modal.style.top = window.scrollY.toFixed(1).toString() + 'px';
    await wait(100);
    modal.style.opacity = '1';
    modal.style.transform = "translateY(0)";
  }

  async function onClickModalClose(event) {
    event.preventDefault();

    if (!event.target.classList.contains("modal-dismiss")) {
      event.stopPropagation();
      return;
    }

    const overlay = document.querySelector(`#${id} .modal-overlay`);
    const modal = document.querySelector(`#${id} .modal-container`);

    overlay.style.opacity = '0';
    modal.style.opacity = '0';
    modal.style.transform = "translateY(-100%)";
    await wait(100);
    overlay.style.display = 'none';
    modal.style.top = '0';

    enableScroll();
  }
</script>

<style>
  .modal-overlay {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: none;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(1.5px);
    z-index: 1024;
    transition: all 0.5s ease-in-out;
    opacity: 0;
  }

  .modal-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    opacity: 0;
    transform: translateY(-100%);
    transition: all 0.5s ease-in-out;
    z-index: 1025;
  }

  .modal-container:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .popup {
    display: grid;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    place-items: center;
    overflow-y: auto;
  }

  .modal {
    display: inline-block;
    max-width: 100%;
    position: relative;
    color: #000000;
    background: #ffffff;
  }

  .modal .container {
    padding: 1.5rem;
  }

  .modal h2 {
    font-family: 'KBO Gothic Bold', sans-serif;
    font-size: 1.25rem;
    border-bottom: solid 1px #000000;
    margin-bottom: 1rem;
  }

  .modal .link-box {
    width: 100%;
    overflow: hidden;
    background: #151515;
  }

  .modal .link-box button {
    font-family: "KBO Gothic Bold", sans-serif;
    font-size: 0.75rem;
    line-height: 2.75rem;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    display: block;
    text-align: center;
    float: left;
    width: 100%;
    transition: all 0.2s ease-in-out;
  }

  .modal .link-box button:first-child {
    border-right: 2px solid rgba(200, 200, 200, 0.1);
  }

  .modal .link-box button:hover {
    background: #4174ff;
  }

  @media (max-width: 768px) {
    .modal {
      max-width: 768px;
    }
  }

  @media (max-width: 578px) {
    .modal {
      width: auto;
      /* margin: 0 20px; */
    }
  }
</style>

<div id={id}>
  <div class="modal-overlay"></div>
  <div class="modal-container">
    <div class="popup modal-dismiss">
      <div class="modal">
        <div class="container">
          <h2>{title}</h2>
          <slot name="contents"></slot>
          <slot name="buttons"></slot>
        </div> 
        <div class="link-box">
          <button class="close">{buttonName}</button>
        </div>
      </div>
    </div>
  </div>
</div>