import { json } from '@sveltejs/kit';

export async function GET({ url, fetch }) {
  const postId = url.searchParams.get('post_id');
  const res = await fetch(`http://db.kyllox.pe.kr/til/get_views.php?post_id=${postId}`);
  const data = await res.json();

  return json(data);
}