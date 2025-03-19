<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const spotPrices = ref([]);

onMounted(async () => {
  try {
    const { data } = await axios.get("https://api.sharenet.co.za/api/v1/px2/spots");
    spotPrices.value = data.data; 
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <div class="container mt-4">
    <h2>Spot Prices</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Price</th>
          <th>Move</th>
          <th>% Move</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(spot, index) in spotPrices.slice(0, 5)" :key="index">
          <td>{{ spot.FullName }}</td>
          <td>{{ spot.Price }}</td>
          <td>{{ spot.Move }}</td>
          <td>{{ parseFloat(spot.PercentageMove).toFixed(2) }}%</td>
          <td>{{ spot.Time }}</td>
        </tr>
      </tbody>
    </table>
    <router-link to="/contact">Contact Us</router-link> |
    <router-link to="/bookings">Bookings</router-link>
  </div>
</template>
