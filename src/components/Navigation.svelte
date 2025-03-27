<style>
  header {
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
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
    color: #000000;
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
    color: #70b7f3;
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
    </nav>
  </div>
</header>