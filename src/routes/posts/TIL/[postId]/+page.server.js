export async function load({ params, fetch }) {
  const postData = {
    post_id: params.postId
  };

  await fetch(`http://db.kyllox.pe.kr/til/update_views.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(postData).toString()
  });

  const res = await fetch(`http://db.kyllox.pe.kr/til/get_views.php?post_id=${params.postId}`);
  const data = await res.json();
  const views = data.views;

  return { views };
}