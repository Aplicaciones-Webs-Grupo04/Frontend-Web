<template>
  <!-- Start Hero Area -->
  <section class="hero-area">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 col-md-12 col-12">
          <div class="hero-content">
            <h4>{{ projectBy }}</h4>
            <h1>{{ platformName }}</h1>
            <p>{{ description }}</p>
            <div class="button">
              <router-link to="/about" class="btn">More Information</router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-7 col-12 d-flex justify-content-end">
          <div class="hero-image wow fadeInRight" data-wow-delay=".4s">
            <img class="main-image" :src="heroImage" alt="PSYMED">
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Hero Area -->
</template>

<script>
export default {
  data() {
    return {
      projectBy: 'A project by the ClosedSource team',
      platformName: 'the best psychiatric platform: PSYMED',
      description: 'Here you can take care of your mental health at all times!',
      heroImage: 'me.svg',
    };
  },
};
</script>

<style scoped>
.hero-area {
  padding: 100px 0;
}
.hero-content h1 {
  font-size: 2.5rem;
}
.button .btn {
  background-color: #10BEAE ;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
}
.hero-image img {
  max-width: 50%;
  height: auto;
  display: flex;
  margin-left: auto;
  margin-right: 0;
}

</style>
