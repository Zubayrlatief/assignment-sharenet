<template>
  <div class="container mt-5 p-4 bg-white rounded shadow-sm">
    <!-- Header Section -->
    <div class="header text-center mb-4">
      <h1 class="display-4 font-weight-bold text-dark">Contact Us</h1>
      <p class="lead text-secondary">We're here to help you! Feel free to reach out to us.</p>
    </div>

    <!-- Contact Info Section -->
    <div class="contact-info mb-4">
      <p><strong>Address:</strong> 301 Imperial Terraces, Tyger Waterfront, Bellville, Cape Town, 7530</p>
      <p><strong>Phone:</strong> +1 234 567 890</p>
      <p><strong>Email:</strong> contact@sharenet.com</p>
    </div>

    <!-- Google Map Section -->
    <div class="map mb-4">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.494954564555!2d18.630107599999988!3d-33.876904499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc41e6218f7ab3%3A0xbdd802ca53b92d43!2sSharenet%20(Pty)%20Ltd!5e0!3m2!1sen!2sza!4v1742461179795!5m2!1sen!2sza" 
        width="100%" 
        height="400" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

    <!-- Back to Home Button -->
    <div class="text-center">
      <router-link to="/" class="btn btn-dark btn-lg">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage'
};
</script>

<style scoped>
/* Removed unnecessary custom styles as Bootstrap handles most of the layout and styling */
</style>
