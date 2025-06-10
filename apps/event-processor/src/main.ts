import 'dotenv/config';
import { runConsumer } from './consumer';

runConsumer().catch((err) => {
  console.error('❌ Consumer error:', err);
  process.exit(1);
});
