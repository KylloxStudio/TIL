<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { marked } from "marked";
  import "github-markdown-css";
  import "highlight.js/styles/github.css";

  let content = "";
  let title = "";

  onMount(async () => {
    const markdownFiles = import.meta.glob("/src/about.md", { as: "raw" });
    const filePath = `/src/about.md`;
    const raw = await markdownFiles[filePath]();

    content = marked(raw);
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
  {@html content}
</article>