<template>
    <div>
      <h2>{{ card.name }}</h2>
      <img v-if="showImage" :src="card.imageUrl" alt="Image de la carte">
      <p>Couleur: {{ card.colors.join(', ') }}</p>
      <p>Coût en mana: {{ card.manaCost }}</p>
      <p>Type: {{ card.type }}</p>
      <router-link :to="`/details/${card.id}`">Détail Carte</router-link>
      <button @click="addToCart">Ajouter au panier</button>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'Carte',
    props: {
      card: {
        type: Object,
        required: true,
      },
      showImage: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      ...mapActions(['ajouterCarteAuPanier']),
      addToCart() {
        this.ajouterCarteAuPanier(this.card);
      },
    },
  };
  </script>
  
  <style>
  /* Styles pour le composant Carte */
  </style>
  