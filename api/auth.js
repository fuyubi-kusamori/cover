export default function(req, res) {
  const { authorization } = req.headers;

  // 認証情報が提供されていない場合
  if (!authorization) {
    return res
      .status(401)
      .setHeader('WWW-Authenticate', 'Basic realm="Secure Area"')
      .end('Access denied');
  }

  // Basic認証のデコード
  const [username, password] = Buffer.from(authorization.split(" ")[1], 'base64').toString().split(":");

  // ここで設定したユーザー名とパスワード
  if (username === 'shinobugaoka' && password === 'dekopin') {
    // 認証成功：リダイレクト
    res.writeHead(302, {
      Location: "https://cover-blush.vercel.app/"
    });
    res.end();
  } else {
    // 認証失敗
    return res
      .status(401)
      .setHeader('WWW-Authenticate', 'Basic realm="Secure Area"')
      .end('Access denied');
  }
}
