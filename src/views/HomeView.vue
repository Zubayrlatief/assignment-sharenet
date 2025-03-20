<template>
  <div class="container">
    <div class="header">
      <h1>Spot Prices Overview</h1>
      <p>Stay updated with the latest spot prices in real time.</p>
    </div>

    <!-- Loader and Error Handling -->
    <div v-if="loading" class="loader">
      <span class="spinner"></span> Loading spot prices...
    </div>
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Spot Prices Table -->
    <div v-if="!loading && !error" class="table-container">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th @click="sort('fullName')" title="Click to sort by Full Name">
              <span>Full Name</span>
              <i :class="getSortIcon('fullName')" class="sort-icon"></i>
            </th>
            <th @click="sort('price')" title="Click to sort by Price">
              <span>Price</span>
              <i :class="getSortIcon('price')" class="sort-icon"></i>
            </th>
            <th @click="sort('move')" title="Click to sort by Move">
              <span>Move</span>
              <i :class="getSortIcon('move')" class="sort-icon"></i>
            </th>
            <th @click="sort('pmove')" title="Click to sort by Percentage Move">
              <span>Percentage Move</span>
              <i :class="getSortIcon('pmove')" class="sort-icon"></i>
            </th>
            <th @click="sort('datetime')" title="Click to sort by Time">
              <span>Time</span>
              <i :class="getSortIcon('datetime')" class="sort-icon"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(spot, index) in sortedSpots" :key="index" class="table-row">
            <td>{{ spot.fullName }}</td>
            <td>{{ formatPrice(spot.price) }}</td>
            <td :class="getMoveClass(spot.move)">{{ spot.move }}</td>
            <td>{{ spot.pmove ? spot.pmove.toFixed(2) : '0.00' }}%</td>
            <td>{{ spot.datetime }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Links Section -->
    <div class="links">
      <router-link to="/contact" class="btn btn-primary">Contact Us</router-link>
      <router-link to="/workshops" class="btn btn-secondary">Workshops</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      spots: [],
      sortColumn: '',
      sortOrder: 1,
      loading: true,
      error: null,
    };
  },
  computed: {
    sortedSpots() {
      return [...this.spots].sort((a, b) => {
        if (!this.sortColumn) return 0;
        const valA = isNaN(a[this.sortColumn]) ? a[this.sortColumn] : parseFloat(a[this.sortColumn]);
        const valB = isNaN(b[this.sortColumn]) ? b[this.sortColumn] : parseFloat(b[this.sortColumn]);
        return this.sortOrder * (valA > valB ? 1 : -1);
      });
    },
  },
  methods: {
    async fetchSpotPrices() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://api.sharenet.co.za/api/v1/px2/spots');
        this.spots = response.data.spots.slice(0, 5) || [];  // Get the latest 5
      } catch (error) {
        this.error = "Failed to load spot prices. Please try again later.";
        console.error("Error fetching spot prices:", error);
      } finally {
        this.loading = false;
      }
    },
    sort(column) {
      this.sortOrder = this.sortColumn === column ? -this.sortOrder : 1;
      this.sortColumn = column;
    },
    formatPrice(price) {
      return price ? `$${parseFloat(price).toFixed(2)}` : 'N/A';
    },
    getMoveClass(value) {
      if (value > 0) return 'positive';
      if (value < 0) return 'negative';
      return '';
    },
    getSortIcon(column) {
      if (this.sortColumn === column) {
        return this.sortOrder === 1 ? 'fa fa-arrow-up' : 'fa fa-arrow-down';
      }
      return 'fa fa-sort';
    },
  },
  mounted() {
    this.fetchSpotPrices();
  },
};
</script>

<style scoped>
/* General Styles */
.container {
  max-width: 1000px;
  margin: auto;
  padding: 30px;
  background-color: #f4f6f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 2.5rem;
  color: #2a3d56;
  font-weight: 700;
  margin-bottom: 10px;
}

.header p {
  color: #7a8a99;
  font-size: 1.1rem;
}

.error {
  color: red;
  font-weight: bold;
  text-align: center;
}

.links {
  margin-top: 20px;
  text-align: center;
}

.links .btn {
  margin: 0 10px;
  font-size: 1.1rem;
}

.sort-icon {
  margin-left: 8px;
  font-size: 0.9rem;
  color: #888;
}

/* Table Styling */
.table-container {
  margin-top: 30px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 16px;
  border-bottom: 1px solid #f1f1f1;
}

th {
  cursor: pointer;
  color: #4a4a4a;
  font-weight: bold;
  background-color: #eceff1;
  text-align: center;
  font-size: 1.1rem;
}

td {
  font-size: 1rem;
  color: #4a4a4a;
}

.table-row {
  transition: background-color 0.3s ease;
}

.table-row:hover {
  background-color: #f9f9f9;
}

.positive {
  color: #28a745;
  font-weight: bold;
}

.negative {
  color: #dc3545;
  font-weight: bold;
}

/* Loader Styles */
.loader {
  text-align: center;
  font-size: 1.2rem;
  color: #007bff;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Button Hover */
.btn-primary:hover, .btn-secondary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
  transition: background-color 0.3s, border-color 0.3s;
}

</style>
