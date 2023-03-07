import { StackExchangeConsumer } from '../index';

async function main() {
  const api = new StackExchangeConsumer('stackoverflow');
  const sql = 'SELECT * FROM posts WHERE tags LIKE \'%typescript%\' AND score > 10';
  const questions = await api.query(sql);
  console.log('Questions:', questions);
}

main().catch(console.error);
