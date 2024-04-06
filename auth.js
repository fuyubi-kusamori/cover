export default function (req, res) {
  // Basic認証で使用するユーザー名とパスワード
  const username = 'shinobugaoka';
  const password = 'dekopin';

  // リクエストからAuthorizationヘッダーを取得
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const encoded = authHeader.split(' ')[1];
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const [reqUsername, reqPassword] = decoded.split(':');

    // ユーザー名とパスワードのチェック
    if (reqUsername === username && reqPassword === password) {
      // 認証成功時のレスポンス、ここで必要な処理を行う
      res.status(200).json({ message: '認証成功' });
      return;
    }
  }

  // 認証が必要であることを示すHTTPステータスコードとヘッダーを設定
  res.setHeader('WWW-Authenticate', 'Basic realm="Access to the site", charset="UTF-8"');
  res.status(401).json({ message: '認証に失敗しました' });
}
