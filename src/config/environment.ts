import { join } from 'path';
import { config } from 'dotenv';

const IN_DEVELOPMENT: boolean = true;

if (IN_DEVELOPMENT) {
  config({ path: join(__dirname, '..', '..', '.env') });
} else {
  config({ path: join(__dirname, '..', '..', 'config/prod.env') });
}
