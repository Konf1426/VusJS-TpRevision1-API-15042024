<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <ul>
    <li><RouterLink class="RouterLink" to="/">Accueil</RouterLink></li>
    <li><RouterLink class="RouterLink" to="/cartes">Cartes</RouterLink></li>
    <li><RouterLink class="RouterLink" to="/sets">Sets</RouterLink></li>
    <li><RouterLink class="RouterLink" to="/recherche">Recherche</RouterLink></li>
  </ul>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

ul{
  list-style-type: none;
  width: 80%;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

li{
  text-align: center;
}

.RouterLink{
  text-decoration: none;
  color: black;
  font-family: 'Roboto', sans-serif;
  transition:0.25s all ease-in-out;
  padding:15px;
}
.RouterLink:hover{
  color: green;
  background-color: rgb(61, 61, 61);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
