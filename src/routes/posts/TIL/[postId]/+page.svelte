<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { isDarkMode } from "../../../../stores";
  import { Marked } from "marked";
  import { markedHighlight } from "marked-highlight";
  import { ProgressBar } from "@prgm/sveltekit-progress-bar";
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

  export let data;
  let postId = $page.params.postId;

  let views = 0;
  let markedContent = "";
  let isSuccessLoading = false;

  function loadUtterances(theme) {
    const container = document.getElementById('utterances-container');

    const oldIframe = container.querySelector('iframe');
    if (oldIframe) container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'KylloxStudio/TIL');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', theme);
    script.crossOrigin = 'anonymous';
    script.async = true;
    container.appendChild(script);
  }

  onMount(async () => {
    isDarkMode.subscribe((dark) => {
      loadUtterances(dark ? 'github-dark' : 'github-light');
    });

    if (postId) {
      try {
        const progress = new ProgressBar({
          target: document.querySelector('body'),
          props: { color: '#70b7f3', zIndex: 100 }
        });
        progress.start();

        const currentTime = Date.now();
        const lastRequestTime = localStorage.getItem('lastRequestTime');

        if (lastRequestTime == null) {
          localStorage.setItem('lastRequestTime', currentTime - 10000);
        }

        if (currentTime - lastRequestTime >= 10000) {
          const postData = {
            post_id: postId
          };

          await fetch('/api/update_views', {
            method: "POST",
            body: JSON.stringify(postData)
          });

          localStorage.setItem('lastRequestTime', currentTime);
        }

        const res = await fetch(`/api/get_views?post_id=${postId}`);
        const data = await res.json();
        views = data.views;

        const markdownFiles = import.meta.glob("/src/contents/TIL/**/README.md", { as: "raw" });
        const raw = await markdownFiles[`/src/contents/TIL/${postId}/README.md`]();

        markedContent = marked.parse(raw);
        isSuccessLoading = true;

        progress.complete();
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

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<!-- <ProgressBar bind:this={progress} color="#70b7f3" zIndex={100} /> -->

<article class="markdown-body">
  {#if isSuccessLoading}
    <p style="text-align: right;">조회수: {views}</p>
  {/if}

  {@html markedContent}

  <div id="utterances-container"></div>
</article>