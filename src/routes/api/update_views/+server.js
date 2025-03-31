import { json } from '@sveltejs/kit';

export async function POST({ request, fetch }) {
  const body = await request.json();
  const postData = {
    post_id: body.post_id
  };
  
  const res = await fetch('http://db.kyllox.pe.kr/til/update_views.php', {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(postData).toString()
  });

  if (res.ok) {
    const data = await res.json();
    return json({
      message: '데이터가 정상적으로 처리되었습니다.',
      received: data
    });
  } else {
    return json({
      message: '오류가 발생했습니다.',
      received: null
    });
  }
}