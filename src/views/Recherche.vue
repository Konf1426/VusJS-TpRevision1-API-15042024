<template>
    <div>
        <h1>Recherche</h1>

        <Panier />
        <!-- Champ de texte pour la recherche -->
        <input type="text" v-model="searchQuery" placeholder="Recherche libre sur les cartes">
        <!-- Filtrage par couleur -->
        <div>
            <button v-for="color in uniqueColors" :key="color" @click="filterByColor(color)">
                {{ color }}
            </button>
        </div>
        <!-- Sélection des types de cartes -->
        <select v-model="selectedType">
            <option value="">Tous les types</option>
            <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
        </select>

        <!-- Affichage des résultats de la recherche -->
        <div v-if="searchResults.length > 0">
            <h2>Résultats de la recherche :</h2>
            <ul>
                <li v-for="card in searchResults" :key="card.id">
                    {{ card.name }} - {{ card.type }} - {{ card.colors }} - {{ card.rarity }} - {{ card.set }} - {{ card.text }} - {{ card.power }} - {{ card.toughness }}
                    <img :src="card.imageUrl" alt="Image de la carte">
                </li>
            </ul>
        </div>
        <div v-else>
            <p>Aucun résultat trouvé.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import Panier from '@/components/Panier.vue';

export default {
    name: 'Recherche',
    components: {
        Panier,
    },
    data() {
        return {
            searchQuery: '',
            colors: [],
            uniqueColors: [],
            selectedColor: '',
            types: [],
            selectedType: '',
            searchResults: [],
        };
    },
    mounted() {
        // Récupérer les types de cartes depuis l'API
        this.fetchCardTypes();
        // Charger toutes les cartes depuis l'API par défaut
        this.fetchAllCards();
    },
    methods: {
        // Requête à l'API pour récupérer les types de cartes
        async fetchCardTypes() {
            try {
                const response = await axios.get('https://api.magicthegathering.io/v1/types');
                this.types = response.data.types;
            } catch (error) {
                console.error('Erreur lors de la récupération des types de cartes :', error);
            }
        },
      // Requête à l'API pour récupérer toutes les cartes
        async fetchAllCards() {
            try {
                const response = await axios.get('https://api.magicthegathering.io/v1/cards');
                this.searchResults = response.data.cards;
                this.extractColors();
            } catch (error) {
                console.error('Erreur lors de la récupération des cartes :', error);
            }
        },
        // Extraire les couleurs uniques des cartes
        extractColors() {
            const allColors = this.searchResults.flatMap(card => card.colors || []);
            this.colors = Array.from(new Set(allColors));
            this.uniqueColors = [...this.colors];
        },
        // Requête à l'API pour effectuer la recherche en fonction des critères
        async performSearch() {
        try {
            const response = await axios.get('https://api.magicthegathering.io/v1/cards', {
                params: {
                    name: this.searchQuery,
                    type: this.selectedType,
                },
            });
            let cards = response.data.cards;
            if (this.selectedColor) {
                cards = cards.filter(card => card.colors && card.colors.includes(this.selectedColor));
            }
            this.searchResults = cards;
        } catch (error) {
            console.error('Erreur lors de la recherche de cartes :', error);
        }
        },
        // Filtrer les cartes par couleur
        filterByColor(color) {
            this.selectedColor = color;
            this.performSearch();
        },
    },
    watch: {
        // Surveiller les changements dans le champ de recherche et actualiser les résultats
        searchQuery() {
            this.performSearch();
        },
        selectedType() {
            this.performSearch();
        },
    },
    computed: {
    ...mapState(['panier']),
    },
};
</script>

<style>
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
    margin-bottom: 40px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    
}

</style>
