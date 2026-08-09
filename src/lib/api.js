export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Streams the assistant's reply as plain text chunks via onChunk(text).
// Returns the full accumulated reply when done.
export async function streamChat(messages, sessionId, onChunk) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, session_id: sessionId }),
  });
  if (!res.ok || !res.body) {
    throw new Error(`Chat request failed (${res.status})`);
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    full += chunk;
    onChunk(chunk, full);
  }
  return full;
}

export async function sendContact({ name, email, message, website = "" }) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message, website }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || `Request failed (${res.status})`);
  return data;
}
