<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const workshops = ref([]);

onMounted(async () => {
  try {
    const { data } = await axios.get("https://yourbackend.com/api/workshops");
    workshops.value = data;
  } catch (error) {
    console.error("Error fetching workshops:", error);
  }
});

const bookWorkshop = async (id) => {
  try {
    await axios.post("https://yourbackend.com/api/book", { workshopId: id });
    alert("Workshop booked successfully!");
  } catch (error) {
    console.error("Booking failed:", error);
  }
};
</script>

<template>
  <div class="container mt-4">
    <h2>Bookings</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Venue</th>
          <th>Date</th>
          <th>Seats</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="workshop in workshops" :key="workshop.id">
          <td>{{ workshop.venue }}</td>
          <td>{{ workshop.date }}</td>
          <td>{{ workshop.seats > 0 ? workshop.seats : 'Sold Out' }}</td>
          <td>
            <button v-if="workshop.seats > 0" @click="bookWorkshop(workshop.id)" class="btn btn-primary">
              Book Now
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/">Back to Spot Prices</router-link>
  </div>
</template>
