import { next } from "@vercel/edge";

export const config = {
  matcher: '/(.*)', 
};

export default function middleware(request) {
  const authorizationHeader = request.headers.get("authorization");

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(" ")[1];
    const [user, password] = atob(basicAuth).toString().split(":");

    if (user === "shinobugaoka" && password === "dekopin") {
      return next();
      res.writeHead(302, {
      Location: "https://cover-blush.vercel.app/"
    });
    res.end();
    }
  }

  return new Response("Basic Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
