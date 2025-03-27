<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { marked } from "marked";
  import matter from 'gray-matter';
  import "github-markdown-css";
  import "highlight.js/styles/github.css";

  let markedContent = "";

  onMount(async () => {
    const unsubscribe = page.subscribe(async ({ params }) => {
      if (params.slug) {
        try {
          // const res = await fetch(`/contents/${params.slug}.md`);
          // if (!res.ok) throw new Error("파일을 찾을 수 없습니다.");
          // const text = await res.text();
          // content = marked(text);

          const markdownFiles = import.meta.glob("/src/contents/*.md", { as: "raw" });
          const filePath = `/src/contents/${params.slug}.md`;
          const raw = await markdownFiles[filePath]();
          
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