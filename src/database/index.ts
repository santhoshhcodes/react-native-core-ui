import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { localDatabaseSchema } from './schema';
import { Employee } from './models/Employee';

const adapter = new SQLiteAdapter({
  schema: localDatabaseSchema,
  migrations: undefined, // Setup structural migration steps here upon system schema changes
  dbName: 'rnkit_core_secure_db',
  jsi: true, // Enables high-speed native C++ data transformations directly in memory
  onSetUpError: (error) => {
    console.error('Critical database initialization failure:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Employee],
});