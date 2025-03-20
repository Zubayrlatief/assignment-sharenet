<template>
  <div class="container">
    <div class="header">
      <h1>Contact Us</h1>
      <p>We're here to help you! Feel free to reach out to us.</p>
    </div>
    <div class="contact-info">
      <p><strong>Address:</strong> 301 Imperial Terraces, Tyger Waterfront, Bellville, Cape Town, 7530</p>
      <p><strong>Phone:</strong> +1 234 567 890</p>
      <p><strong>Email:</strong> contact@sharenet.com</p>
    </div>

    <div class="map">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.494954564555!2d18.630107599999988!3d-33.876904499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc41e6218f7ab3%3A0xbdd802ca53b92d43!2sSharenet%20(Pty)%20Ltd!5e0!3m2!1sen!2sza!4v1742461179795!5m2!1sen!2sza" 
        width="600" 
        height="450" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

    <div class="links">
      <router-link to="/" class="btn btn-primary">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage'
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #000; /* Black text */
  font-weight: 700;
  margin-bottom: 10px;
}

.header p {
  color: #333; /* Dark grey text */
  font-size: 1.1rem;
}

.contact-info p {
  font-size: 1rem;
  color: #333; /* Dark grey text */
}

.map {
  margin-top: 20px;
}

iframe {
  width: 100%;
  height: 400px;
}

.links {
  margin-top: 20px;
  text-align: center;
}

.links .btn {
  margin: 0 10px;
  font-size: 1.1rem;
  color: #000; /* Black text on buttons */
  background-color: #fff; /* White background */
  border: 1px solid #000; /* Black border */
}

.btn-primary {
  color: #fff; /* White text */
  background-color: #000; /* Black background */
  border-color: #000;
}

.btn-primary:hover {
  background-color: #333; /* Dark grey on hover */
  border-color: #333;
}
</style>
