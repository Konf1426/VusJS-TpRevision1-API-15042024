<template>
    <div>
        <h1>Cartes</h1>
        
        <div class="ele-page">
            <div class="cartes-affichage">
                        <!-- Options d'affichage -->
                <div>
                    <input type="checkbox" v-model="showImages"> Afficher les images des cartes
                </div>
            
                <!-- Navigation entre les cartes -->
                <div>
                    <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
                    <span>{{ currentPage }} / {{ totalPages }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
                </div>
            
                <!-- Affichage des cartes -->
                <div>
                    <div v-for="card in displayedCards" :key="card.id">
                        <Carte :card="card" :showImage="showImages" @addToCart="addToCart" />
                    </div>
                </div>
            </div>
            <div class="panier-affichage">
                <Panier />
            </div>
    </div>

    </div>
</template>

<script>
import axios from 'axios';
import Carte from '@/components/Carte.vue';
import Panier from '@/components/Panier.vue';

export default {
    name: 'Cartes',
    components: {
        Carte,
        Panier,
    },
    data() {
        return {
            currentPage: 1,
            cardsPerPage: 10, // Modifier si nécessaire
            showImages: false,
            cards: [],
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.cards.length / this.cardsPerPage);
        },
        displayedCards() {
            const startIndex = (this.currentPage - 1) * this.cardsPerPage;
            const endIndex = startIndex + this.cardsPerPage;
            return this.cards.slice(startIndex, endIndex);
        },
    },
    mounted() {
        this.fetchCards();
    },
    methods: {
        fetchCards() {
        axios.get('https://api.magicthegathering.io/v1/cards')
            .then(response => {
                    this.cards = response.data.cards;
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des cartes :', error);
            });
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
        },
        addToCart(card) {
        // Ici, Possible éventuellement appeler une action Vuex pour ajouter la carte au panier
        // Exemple : this.$store.dispatch('ajouterCarteAuPanier', card);
        },
    },
};
</script>

<style>

.ele-page {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 0 auto;
    background-color: rgb(223, 223, 223);
    width: 60%;
}
</style>