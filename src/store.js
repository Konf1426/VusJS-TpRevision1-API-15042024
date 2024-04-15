import { createStore } from 'vuex';

export default createStore({
    state: {
        panier: JSON.parse(localStorage.getItem('panier')) || [],
    },
    mutations: {
        ajouterAuPanier(state, carte) {
            state.panier.push(carte);
            localStorage.setItem('panier', JSON.stringify(state.panier));
        },
        removeFromCart(state, itemId) {
            state.panier = state.panier.filter(item => item.id !== itemId);
            localStorage.setItem('panier', JSON.stringify(state.panier));
        },
    },
    actions: {
    ajouterCarteAuPanier({ commit }, carte) {
        commit('ajouterAuPanier', carte);
    },
    supprimerCarteDuPanier({ commit }, itemId) {
        commit('removeFromCart', itemId);
    },
    },
    getters: {
        panier(state) {
            return state.panier;
        },
    },
});