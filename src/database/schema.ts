import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const localDatabaseSchema = appSchema({
  version: 1, // Whenever you alter columns later, increment this version integer
  tables: [
    tableSchema({
      name: 'employees',
      columns: [
        { name: 'first_name', type: 'string' },
        { name: 'last_name', type: 'string' },
        { name: 'email', type: 'string', isIndexed: true },
        { name: 'department', type: 'string', isIndexed: true },
        { name: 'role', type: 'string' },
        { name: 'status', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});