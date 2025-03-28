<script>
  import { onMount } from "svelte";
  import ToggleSwitch from "./ToggleSwitch.svelte";

  let isDarkMode = false;
  let currentTheme = 'github';
  let themeLink;

  const onChangedDarkToggle = () => {
    setTheme(isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  };

  const setTheme = (isDark) => {
    if (themeLink) {
      document.head.removeChild(themeLink);
    }

    if (isDark) {
      document.documentElement.setAttribute('color-theme', 'dark');
      isDarkMode = true;
      currentTheme = 'github-dark';
    } else {
      document.documentElement.setAttribute('color-theme', 'light');
      isDarkMode = false;
      currentTheme = 'github';
    }

    themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/${currentTheme}.min.css`;
    document.head.appendChild(themeLink);
  };

  onMount(() => {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme !== null) {
      setTheme(savedTheme === 'true');
    } else {
      setTheme(prefersDarkScheme.matches);
    }

    prefersDarkScheme.addEventListener('change', (e) => {
      console.log(e.matches)
      if (localStorage.getItem('darkMode') === null) {
        setTheme(e.matches);
      }
    });
  })
</script>

<style>
  header {
    background-color: var(--bg-secondary);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
    transition: background-color 0.3s;
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    margin: 0 auto;
  }

  .logo a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-primary);
  }

  /* .logo img {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    margin-right: 4px;
  } */

  .logo span {
    font-family: 'Poppins Bold Italic';
    font-size: 24px;
  }

  nav {
    display: flex;
    align-items: center;
  }

  nav ul {
    display: flex;
    list-style: none;
  }

  nav ul li {
    margin-left: 30px;
  }

  nav ul li a {
    font-family: 'Poppins';
    transition: color 0.2s;
  }

  nav ul li a:hover {
    color: var(--accent-color);
  }

  .theme-toggle {
    margin-left: 30px;
    display: flex;
    align-items: center;
  }
  
  .theme-toggle-icon {
    display: flex;
    margin-right: 4px;
    font-size: 18px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>

<header>
  <div class="container header-container">
    <div class="logo">
      <a href="/">
        <!-- <img class="logo" src="https://avatars.githubusercontent.com/u/58764585?s=48&v=4" alt="Profile"> -->
        <span>JIMIN's TIL</span>
      </a>
    </div>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
      <div class="theme-toggle">
        <span class="theme-toggle-icon">🌓</span>
        <ToggleSwitch bind:isChecked={isDarkMode} onClickMethod={onChangedDarkToggle} />
      </div>
    </nav>
  </div>
</header>