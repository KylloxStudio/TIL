<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { marked } from "marked";
  import "github-markdown-css";
  import "highlight.js/styles/github.css";

  let markedContent = "";

  onMount(async () => {
    const unsubscribe = page.subscribe(async ({ params }) => {
      if (params.slug) {
        try {
          const markdownFiles = import.meta.glob("/src/contents/TIL/**/README.md", { as: "raw" });
          const raw = await markdownFiles[`/src/contents/TIL/${params.slug}/README.md`]();
          
          markedContent = marked(raw);
        } catch (err) {
          markedContent = `<p>${err}</p>`;
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
  {@html markedContent}
</article>