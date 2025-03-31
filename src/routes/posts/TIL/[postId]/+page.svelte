<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { Marked } from "marked";
  import { markedHighlight } from "marked-highlight";
  import hljs from 'highlight.js';
  import "github-markdown-css";
  // import 'highlight.js/styles/github.css';

  const marked = new Marked(
    markedHighlight({
      emptyLangClass: 'hljs',
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  let postId = $page.params.postId;

  let views = 0;
  let markedContent = "";
  let isSuccessLoading = false;

  onMount(async () => {
    if (postId) {
      try {
        const lastRequestTime = localStorage.getItem('lastRequestTime');
        const currentTime = Date.now();

        if (lastRequestTime && (currentTime - lastRequestTime) >= 10000) {
          const postData = {
            post_id: postId
          };

          await fetch(`http://db.kyllox.pe.kr/til/update_views.php`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(postData).toString()
          });

          localStorage.setItem('lastRequestTime', currentTime);
        }

        const res = await fetch(`http://db.kyllox.pe.kr/til/get_views.php?post_id=${postId}`);
        const data = await res.json();
        views = data.views;

        const markdownFiles = import.meta.glob("/src/contents/TIL/**/README.md", { as: "raw" });
        const raw = await markdownFiles[`/src/contents/TIL/${postId}/README.md`]();

        markedContent = marked.parse(raw);
        isSuccessLoading = true;
      } catch (err) {
        console.error(err);
        markedContent = `<p>오류가 발생했습니다.</p>`;
      }
    }
  });
</script>

<style>
  article {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 10px 20px 40px;
  }
</style>

<article class="markdown-body">
  {#if isSuccessLoading}
    <p style="text-align: right;">조회수: {views}</p>
  {/if}

  {@html markedContent}
</article>