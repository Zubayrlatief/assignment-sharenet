<template>
  <div class="container">
    <h1>Upcoming Workshops</h1>
    <table>
      <thead>
        <tr>
          <th>Venue</th>
          <th>Date</th>
          <th>Seats Available</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="workshop in workshops" :key="workshop.id">
          <td>{{ workshop.venue }}</td>
          <td>{{ workshop.date }}</td>
          <td>{{ workshop.seats }}</td>
          <td>
            <button v-if="workshop.seats > 0" @click="bookWorkshop(workshop.id)">
              Book Now
            </button>
            <span v-else>Sold Out</span>
          </td>
        </tr>
      </tbody>
    </table>

    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      workshops: [],
    };
  },
  methods: {
    async fetchWorkshops() {
      try {
        const response = await axios.get("https://backend-assignment-sharenet.onrender.com/api/workshops");
        this.workshops = response.data;
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    },
    async bookWorkshop(workshopId) {
      try {
        const response = await axios.post("https://backend-assignment-sharenet.onrender.com/api/book", {
          workshopId,
        });
        alert(response.data.message);
        this.fetchWorkshops(); // Refresh workshop data
      } catch (error) {
        console.error("Error booking workshop:", error);
        alert(error.response?.data?.error || "Booking failed");
      }
    },
  },
  mounted() {
    this.fetchWorkshops();
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
</style>
