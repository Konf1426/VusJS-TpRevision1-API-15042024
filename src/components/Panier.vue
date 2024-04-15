<template>
    <div>
        <h2>Panier</h2>
        <ul>
            <li v-for="item in panier" :key="item.id">
                {{ item.name }} - {{ item.quantity }} - {{ item.price }}
                <button @click="removeFromCart(item)">Supprimer</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

    export default {
    name: 'Panier',
    computed: {
        ...mapState(['panier']),
    },
    methods: {
        ...mapActions(['removeFromCart']),
    },
};
</script>

<style>

</style>