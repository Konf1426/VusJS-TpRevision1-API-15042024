<template>
    <div>
        <h1>Accueil</h1>
        <Panier />

        <div v-if="loading">Chargement...</div>
        <div v-else>
            <div v-for="card in cards" :key="card.id">
            <h2>{{ card.name }}</h2>
            <p>{{ card.text }}</p>
            <img :src="card.imageUrl" alt="Image de la carte">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Panier from '@/components/Panier.vue'

export default {
    name: 'Accueil',
    components: {
        Panier
    },
    data() {
        return {
        loading: true,
        cards: []
        }
    },
    async created() {
        try {
            const response = await axios.get('https://api.magicthegathering.io/v1/cards')
            this.cards = response.data.cards
            this.loading = false
        } catch (error) {
            console.error(error)
            this.loading = false
        }
    }
}
</script>