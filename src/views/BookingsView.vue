<template>
  <div class="container">
    <h1>Upcoming Workshops</h1>
    <table>
      <thead>
        <tr>
          <th>Venue</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(workshop, index) in availableWorkshops" :key="index">
          <td>{{ workshop.venue }}</td>
          <td>{{ workshop.date }}</td>
          <td>{{ workshop.status }}</td>
          <td>
            <button v-if="workshop.status === 'Available'" @click="bookWorkshop(workshop)">
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
import axios from 'axios';

export default {
  data() {
    return {
      workshops: [
        { venue: "Cape Town", date: "2024-10-10", status: "Available" },
        { venue: "Durban", date: "2024-10-15", status: "Sold Out" },
      ],
    };
  },
  computed: {
    availableWorkshops() {
      return this.workshops.filter(w => w.status === "Available");
    }
  },
  methods: {
    async bookWorkshop(workshop) {
      try {
        await axios.post("https://your-live-api.com/bookings", { 
          venue: workshop.venue, 
          date: workshop.date 
        });
        alert("Workshop booked successfully!");
      } catch (error) {
        console.error(error);
      }
    }
  }
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
