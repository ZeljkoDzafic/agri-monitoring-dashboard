<template>
  <div>
    <h1 class="text-h4 mb-4">Transaction History</h1>

    <v-card>
      <v-card-title class="d-flex align-center">
        <span>Blockchain Transactions</span>
        <v-spacer />
        <v-btn icon @click="fetchTransactions" :loading="loading">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Asset</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tx in transactions" :key="tx.id">
              <td>
                <code>{{ tx.id?.substring(0, 16) }}...</code>
              </td>
              <td>
                <v-chip :color="tx.type === 'CREATE' ? 'success' : 'info'" size="small">
                  {{ tx.type }}
                </v-chip>
              </td>
              <td>{{ tx.asset_type || 'N/A' }}</td>
              <td>{{ formatDate(tx.timestamp) }}</td>
              <td>
                <v-btn icon size="small" @click="viewTransaction(tx)">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div v-if="transactions.length === 0" class="text-center pa-8 text-grey">
          No transactions found
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDetailDialog" max-width="700">
      <v-card v-if="selectedTransaction">
        <v-card-title>Transaction Details</v-card-title>
        <v-card-text>
          <pre class="bg-grey-lighten-4 pa-4 rounded overflow-auto">{{ JSON.stringify(selectedTransaction, null, 2) }}</pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showDetailDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(false)
const transactions = ref([])
const selectedTransaction = ref(null)
const showDetailDialog = ref(false)

function formatDate(dateStr) {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleString()
}

async function fetchTransactions() {
  loading.value = true
  // Simulate fetching transactions (replace with actual API call)
  setTimeout(() => {
    transactions.value = [
      { id: 'abc123def456789012345678', type: 'CREATE', asset_type: 'sensor', timestamp: new Date().toISOString() },
      { id: 'def456abc789012345678901', type: 'TRANSFER', asset_type: 'measurement', timestamp: new Date().toISOString() }
    ]
    loading.value = false
  }, 500)
}

function viewTransaction(tx) {
  selectedTransaction.value = tx
  showDetailDialog.value = true
}

onMounted(fetchTransactions)
</script>
