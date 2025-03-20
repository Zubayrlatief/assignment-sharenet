<template>
  <div class="container mt-5">
    <div class="text-center mb-4">
      <h1 class="display-4">Spot Prices Overview</h1>
      <p class="lead text-muted">Stay updated with the latest spot prices in real time.</p>
    </div>

    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Loading spot prices...</p>
    </div>

    <p v-if="error" class="text-danger text-center">{{ error }}</p>

    <div v-if="!loading && !error" class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="thead-light">
          <tr>
            <th @click="sort('fullName')" style="cursor: pointer;">
              <span>Full Name</span>
              <i :class="getSortIcon('fullName')" class="sort-icon"></i>
            </th>
            <th @click="sort('price')" style="cursor: pointer;">
              <span>Price</span>
              <i :class="getSortIcon('price')" class="sort-icon"></i>
            </th>
            <th @click="sort('move')" style="cursor: pointer;">
              <span>Move</span>
              <i :class="getSortIcon('move')" class="sort-icon"></i>
            </th>
            <th @click="sort('pmove')" style="cursor: pointer;">
              <span>Percentage Move</span>
              <i :class="getSortIcon('pmove')" class="sort-icon"></i>
            </th>
            <th @click="sort('datetime')" style="cursor: pointer;">
              <span>Time</span>
              <i :class="getSortIcon('datetime')" class="sort-icon"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(spot, index) in sortedSpots" :key="index">
            <td>{{ spot.fullName }}</td>
            <td>{{ formatPrice(spot.price) }}</td>
            <td :class="getMoveClass(spot.move)">{{ spot.move }}</td>
            <td>{{ spot.pmove ? spot.pmove.toFixed(2) : '0.00' }}%</td>
            <td>{{ spot.datetime }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-center mt-4">
      <router-link to="/contact" class="btn btn-primary mx-2">Contact Us</router-link>
      <router-link to="/workshops" class="btn btn-secondary mx-2">Workshops</router-link>
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
        this.spots = response.data.spots.slice(0, 5) || [];
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
      if (value > 0) return 'text-success';
      if (value < 0) return 'text-danger';
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
.sort-icon {
  margin-left: 8px;
  font-size: 0.9rem;
  color: #888;
}

.container {
  background-image: url('https://zubayrlatief.github.io/Images-/pexels-mikhail-nilov-9301821.jpg');
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.table {
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

thead {
  background-color: #007bff; /* Blue header background */
  color: #fff;
}

thead th {
  text-align: center;
}

.text-center {
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}
</style>
