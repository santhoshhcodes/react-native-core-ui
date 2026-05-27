import { synchronize } from '@nozbe/watermelondb/sync';
import apiClient from '@/api/client';
import { database } from './index';

export async function runLocalDatabaseSync(): Promise<void> {
  try {
    await synchronize({
      database,
      
      // ─── PULL CHANGES FROM FASTAPI ────────────────────────────────────────
      pullChanges: async ({ lastPulledAt, schemaVersion }) => {
        const response = await apiClient.get('/sync/pull', {
          params: {
            last_pulled_at: lastPulledAt || 0,
            schema_version: schemaVersion,
          },
        });
        
        const { changes, timestamp } = response.data;
        // Backend payload format expected: { changes: { employees: { created: [], updated: [], deleted: [] } }, timestamp: epoch_ms }
        return { changes, timestamp };
      },

      // ─── PUSH OFFLINE MUTATIONS TO FASTAPI ────────────────────────────────
      pushChanges: async ({ changes, lastPulledAt }) => {
        await apiClient.post('/sync/push', {
          changes,
          last_pulled_at: lastPulledAt,
        });
      },
    });
  } catch (error) {
    console.error('Delta Synchronization pipeline exception encountered:', error);
    throw error;
  }
}