import './config/environment';
import './config/database';
import './schema/User';

import app from './app';

import { Port } from './utils/Server';

const PORT: Port = Number(process.env.PORT);
app.listen(PORT);
