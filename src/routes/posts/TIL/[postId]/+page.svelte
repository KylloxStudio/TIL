<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { Marked } from "marked";
  import { markedHighlight } from "marked-highlight";
  import hljs from 'highlight.js';
  import "github-markdown-css";
  // import 'highlight.js/styles/github.css';

  export let data;

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

  let views = data.views;
  let markedContent = "";
  let isSuccessLoading = false;

  onMount(async () => {
    const unsubscribe = page.subscribe(async ({ params }) => {
      if (params.postId) {
        try {
          const markdownFiles = import.meta.glob("/src/contents/TIL/**/README.md", { as: "raw" });
          const raw = await markdownFiles[`/src/contents/TIL/${params.postId}/README.md`]();

          markedContent = marked.parse(raw);
          isSuccessLoading = true;
        } catch (err) {
          markedContent = `<p>404: 페이지를 찾을 수 없습니다.</p>`;
        }
      }
    });
    
    return () => unsubscribe();
  });
</script>

<style>
  article {
    width: 100%;
    max-width: 1028px;
    margin: 0 auto;
    padding: 40px 20px;
  }
</style>

<article class="markdown-body">
  {#if isSuccessLoading}
    <p>조회수: {views}</p>
  {/if}

  {@html markedContent}
</article>