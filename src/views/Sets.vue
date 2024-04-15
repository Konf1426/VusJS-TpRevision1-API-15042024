<template>
    <div>
        <h1>Sets de cartes</h1>
        <div v-if="sets.length">
            <ul>
                <li v-for="set in sets" :key="set.code">
                    {{ set.name }}
                </li>
            </ul>
        </div>
        <div v-else>
            Chargement des sets de cartes...
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Sets',
    data() {
        return {
        sets: [],
        };
    },
    async created() {
        const response = await axios.get('https://api.magicthegathering.io/v1/sets');
        this.sets = response.data.sets;
    },
};
</script>

<style scoped>
</style>