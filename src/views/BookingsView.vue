<template>
  <div class="container my-5">
    <div class="header text-center mb-4">
      <h1 class="display-4">Upcoming Workshops</h1>
      <p class="lead">Stay updated with the latest workshops and book your spot now!</p>
    </div>

    <div v-if="loading" class="d-flex justify-content-center align-items-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <p class="ms-2">Loading workshops...</p>
    </div>
    
    <p v-if="error" class="text-danger text-center font-weight-bold">{{ error }}</p>

    <div v-if="!loading && !error" class="table-container">
      <table class="table table-bordered table-striped table-hover">
        <thead class="thead-dark">
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
            <td>{{ formatDate(workshop.date) }}</td>
            <td>{{ workshop.seats }}</td>
            <td>
              <button 
                v-if="workshop.seats > 0" 
                @click="bookWorkshop(workshop.id)" 
                class="btn btn-primary btn-sm"
              >
                Book Now
              </button>
              <span v-else class="text-danger fw-bold">Sold Out</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ successMessage }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <div class="text-center mt-4">
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
  max-width: 1200px;
  margin: auto;
}

.table-container {
  margin-top: 30px;
}

.table th, .table td {
  text-align: center;
  vertical-align: middle;
}

.table th {
  background-color: #f8f9fa;
}

.text-center {
  text-align: center;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.text-danger {
  color: #dc3545 !important;
}

.fw-bold {
  font-weight: bold;
}

.alert {
  max-width: 600px;
  margin: auto;
}

.btn-close {
  background: transparent;
}

</style>
