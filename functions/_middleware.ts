const PASSWORD = "hermeticHRM";
const COOKIE_NAME = "hermetic_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getLoginPage(error = false): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hermetic Docs — Access Required</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0d0d0d;
      color: #e8e8e8;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .card {
      width: 100%;
      max-width: 380px;
      padding: 2.5rem;
      border: 1px solid #2a2a2a;
      background: #111;
    }
    .logo {
      font-size: 1.5rem;
      color: #E8A838;
      letter-spacing: 0.08em;
      margin-bottom: 0.4rem;
      font-weight: 700;
    }
    .subtitle {
      font-size: 0.75rem;
      color: #555;
      margin-bottom: 2rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    label {
      display: block;
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #666;
      margin-bottom: 0.5rem;
    }
    input[type="password"] {
      width: 100%;
      background: #0d0d0d;
      border: 1px solid #2a2a2a;
      color: #e8e8e8;
      padding: 0.75rem 1rem;
      font-family: inherit;
      font-size: 0.9rem;
      margin-bottom: 1.25rem;
      outline: none;
      transition: border-color 0.15s;
    }
    input[type="password"]:focus { border-color: #E8A838; }
    ${error ? "input[type=\"password\"] { border-color: #c0392b; }" : ""}
    button {
      width: 100%;
      background: #E8A838;
      color: #0d0d0d;
      border: none;
      padding: 0.75rem;
      font-family: inherit;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    button:hover { opacity: 0.85; }
    .error {
      font-size: 0.75rem;
      color: #c0392b;
      margin-bottom: 1rem;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">Hermetic</div>
    <div class="subtitle">Documentation · Access Required</div>
    ${error ? '<p class="error">Incorrect password. Try again.</p>' : ""}
    <form method="POST">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" autofocus placeholder="••••••••••">
      <button type="submit">Enter</button>
    </form>
  </div>
</body>
</html>`;
}

export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);

  // Always allow static assets through (no auth on _astro/ chunks etc)
  if (url.pathname.startsWith("/_astro/") || url.pathname.startsWith("/favicon")) {
    return next();
  }

  const cookie = request.headers.get("Cookie") || "";
  const cookies = Object.fromEntries(
    cookie.split(";").map((c) => c.trim().split("=").map(decodeURIComponent))
  );

  const expectedHash = await hashPassword(PASSWORD);

  // Check existing auth cookie
  if (cookies[COOKIE_NAME] === expectedHash) {
    return next();
  }

  // Handle login form POST
  if (request.method === "POST") {
    const formData = await request.formData();
    const submitted = formData.get("password") as string;

    if (submitted === PASSWORD) {
      const response = new Response(null, {
        status: 302,
        headers: {
          Location: url.pathname + url.search,
          "Set-Cookie": `${COOKIE_NAME}=${expectedHash}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax; Secure`,
        },
      });
      return response;
    }

    return new Response(getLoginPage(true), {
      status: 401,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Show login page
  return new Response(getLoginPage(false), {
    status: 401,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
