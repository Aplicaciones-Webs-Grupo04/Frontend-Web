<template>
  <!-- Start Features Area -->
  <section id="aboutus" class="features section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 col-12">
          <div class="image wow fadeInLeft" data-wow-delay=".3s">
            <img :src="aboutUsImage" alt="About PsyMed">
          </div>
        </div>
        <div class="col-lg-6 col-12">
          <div class="content">
            <h3 class="heading wow fadeInUp" data-wow-delay=".5s">
              <span>{{ aboutTitle }}</span> Closed Source <br />
              Psymed
            </h3>
            <!-- Start Single Feature -->
            <div v-for="(feature, index) in features" :key="index" class="single-feature wow fadeInUp" :data-wow-delay="feature.delay">
              <div class="f-icon">
                <i :class="feature.icon"></i>
              </div>
              <h4>{{ feature.title }}</h4>
              <p>{{ feature.description }}</p>
            </div>
            <!-- End Single Feature -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Features Area -->
</template>

<script>
export default {
  data() {
    return {
      aboutTitle: 'About Us',
      aboutUsImage: 'sano.svg', // Ruta de la imagen
      features: [
        {
          title: 'Who we are?',
          description: 'PsyMed is a university startup dedicated to creating an app that optimizes mental health management.',
          icon: 'lni lni-dashboard',
          delay: '.6s',
        },
        {
          title: 'What is our mission?',
          description: 'Our mission is to facilitate the management of appointments, records, and clinical history, improving the care and work of professionals.',
          icon: 'lni lni-pencil-alt',
          delay: '.7s',
        },
        {
          title: 'Subscriptions',
          description: 'We have a subscription system that offers access to advanced features to maximize efficiency and customization.',
          icon: 'lni lni-vector',
          delay: '.8s',
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Puedes agregar aquí los estilos necesarios */
.features {
  padding: 100px 0;
}
.single-feature {
  margin-bottom: 20px;
}
.f-icon i {
  font-size: 24px;
  color: #007bff;
}
.heading {
  font-size: 2rem;
}
</style>
