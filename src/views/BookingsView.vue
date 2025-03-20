<template>
  <div class="container">
    <div class="header">
      <h1>Upcoming Workshops</h1>
      <p>Stay updated with the latest workshops and book your spot now!</p>
    </div>

    <div v-if="loading" class="loader">
      <span class="spinner"></span> Loading workshops...
    </div>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="!loading && !error" class="table-container">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Venue</th>
            <th>Date</th>
            <th>Seats Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workshop in workshops" :key="workshop.id" class="table-row">
            <td>{{ workshop.venue }}</td>
            <td>{{ workshop.date }}</td>
            <td>{{ workshop.seats }}</td>
            <td>
              <button 
                v-if="workshop.seats > 0" 
                @click="bookWorkshop(workshop.id)" 
                class="btn btn-primary"
              >
                Book Now
              </button>
              <span v-else class="sold-out">Sold Out</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="successMessage" class="dropdown">
      <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{ successMessage }}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <p class="dropdown-item">{{ successMessage }}</p>
      </div>
    </div>

    <div class="links">
      <router-link to="/" class="btn btn-secondary">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      workshops: [],
      loading: false,
      error: null,
      successMessage: "",
    };
  },
  methods: {
    async fetchWorkshops() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("https://backend-assignment-sharenet.onrender.com/api/workshops");
        this.workshops = response.data;
      } catch (error) {
        this.error = "Failed to load workshops. Please try again later.";
        console.error("Error fetching workshops:", error);
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    },

    async bookWorkshop(workshopId) {
      try {
        const response = await axios.post("https://backend-assignment-sharenet.onrender.com/api/book", {
          workshopId,
        });
        this.successMessage = "Successful booking! Saved to our database.";
        this.fetchWorkshops();
      } catch (error) {
        console.error("Error booking workshop:", error);
        this.successMessage = "";
        alert(error.response?.data?.error || "Booking failed");
      }
    },
  },
  mounted() {
    this.fetchWorkshops();
  },
};
</script>

<style scoped>
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

.header h1 {
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

.sold-out {
  color: #dc3545;
  font-weight: bold;
}

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

.dropdown {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  font-size: 1.1rem;
  padding: 10px 20px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.dropdown-menu {
  display: block;
  text-align: center;
}

.dropdown-item {
  font-size: 1rem;
  color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.btn-primary:hover, .btn-secondary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
  transition: background-color 0.3s, border-color 0.3s;
}
</style>
