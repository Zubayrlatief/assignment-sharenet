<template>
  <div class="container">
    <h1>Spot Prices</h1>
    <table>
      <thead>
        <tr>
          <th @click="sort('FullName')">FullName</th>
          <th @click="sort('Price')">Price</th>
          <th @click="sort('Move')">Move</th>
          <th @click="sort('PercentageMove')">Percentage Move</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(spot, index) in sortedSpots" :key="index">
          <td>{{ spot.FullName }}</td>
          <td>{{ spot.Price }}</td>
          <td>{{ spot.Move }}</td>
          <td>{{ spot.PercentageMove.toFixed(2) }}%</td>
          <td>{{ spot.Time }}</td>
        </tr>
      </tbody>
    </table>
    <router-link to="/contact">Contact Us</router-link>
    <router-link to="/workshops">Workshops</router-link>
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
    };
  },
  computed: {
    sortedSpots() {
      return [...this.spots].sort((a, b) => {
        if (!this.sortColumn) return 0;
        return this.sortOrder * (a[this.sortColumn] > b[this.sortColumn] ? 1 : -1);
      });
    },
  },
  methods: {
    fetchSpotPrices() {
      axios.get('https://api.sharenet.co.za/api/v1/px2/spots')
        .then(response => {
          this.spots = response.data;
        })
        .catch(error => console.error(error));
    },
    sort(column) {
      this.sortOrder = this.sortColumn === column ? -this.sortOrder : 1;
      this.sortColumn = column;
    }
  },
  mounted() {
    this.fetchSpotPrices();
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  cursor: pointer;
  background: #f4f4f4;
}
</style>
