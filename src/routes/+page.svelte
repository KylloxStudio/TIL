<script>
  import { onMount } from "svelte";

  export let data;

  onMount(() => {});
</script>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .posts-section {
    padding: 40px 0;
  }

  .section-title {
    font-size: 24px;
    margin-bottom: 30px;
    position: relative;
    padding-bottom: 10px;
  }

  .section-title::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 3px;
    background-color: #0066cc;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
  }

  .post-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .post-image {
    height: 200px;
    overflow: hidden;
  }

  .post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .post-card:hover .post-image img {
    transform: scale(1.05);
  }

  .post-content {
    padding: 20px;
  }

  .post-category {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    color: #0066cc;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .post-title {
    font-size: 18px;
    margin-bottom: 10px;
    line-height: 1.4;
  }

  .post-excerpt {
    color: #666;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .post-meta {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
  }

  .post-date {
    margin-right: 15px;
  }

  footer {
    background-color: white;
    padding: 60px 0 30px;
    margin-top: 60px;
  }

  .copyright {
    text-align: center;
    padding-top: 30px;
    border-top: 1px solid #eee;
    color: #999;
    font-size: 14px;
  }
</style>

<main class="container">
  <section class="posts-section">
    <h2 class="section-title">Posts</h2>
    <div class="posts-grid">
      {#each data.posts as post}
        <article class="post-card">
          <a href="/posts/{post.slug}">
            <div class="post-image">
              <img src="/images/{post.slug}/thumbnail.jpg" alt="thumbnail" />
            </div>
            <div class="post-content">
              <span class="post-category">{post.metadata.tag}</span>
              <h3 class="post-title">{post.metadata.title}</h3>
              <p class="post-excerpt">{post.metadata.desc}</p>
              <div class="post-meta">
                <span class="post-date">{post.metadata.lastModified}</span>
              </div>
            </div>
          </a>
        </article>
      {/each}
    </div>
  </section>
</main>

<footer>
  <div class="container">
    <div class="copyright">
      <p>&copy; 2025 Jung Ji Min. All rights reserved.</p>
    </div>
  </div>
</footer>
