<template>
  <div>
    <h1>Page détaillée de la carte</h1>
    <hr>
    <Panier />
    <hr>
    <div>
      <label for="language-select">Choisissez une langue :</label>
      <select v-model="selectedLanguage" id="language-select">
        <option v-for="language in availableLanguages" :key="language" :value="language">
          {{ language }}
        </option>
      </select>
    </div>
    <hr>
    <div v-if="card">
      <h2>{{ cardNameInSelectedLanguage }}</h2>
      <img :src="card.imageUrl" alt="Image de la carte">
      <p>Couleur: {{ card.colors.join(', ') }}</p>
      <p>Coût en mana: {{ card.manaCost }}</p>
      <p>Type: {{ card.type }}</p>
      <p>Rareté: {{ card.rarity }}</p>
      <p>Set: {{ card.set }}</p>
      <p>Texte: {{ card.text }}</p>
      <p>Puissance: {{ card.power }}</p>
      <p>Résistance: {{ card.toughness }}</p>
    </div>
    <div v-else>
      Détails en cours de chargement...
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
import Panier from '@/components/Panier.vue';

export default {
  name: 'DetailCarte',
  components: {
    Panier,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      card: null,
      selectedLanguage: 'English', // Langue par défaut
    };
  },
  computed: {
    cardNameInSelectedLanguage() {
      if (this.card) {
        const nameObject = this.card.foreignNames.find(nameObject => nameObject.language === this.selectedLanguage);
        return nameObject ? nameObject.name : this.card.name;
      }
      return '';
    },
    availableLanguages() {
      return this.card ? this.card.foreignNames.map(nameObject => nameObject.language) : [];
    },
  },
  async created() {
    const response = await axios.get(`https://api.magicthegathering.io/v1/cards/${this.id}`);
    this.card = response.data.card;
  },
};
</script>

<style>
/* Styles pour la page détaillée de la carte */
</style>