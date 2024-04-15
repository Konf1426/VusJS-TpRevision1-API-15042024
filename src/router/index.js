import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Recherche from '../views/Recherche.vue'
import Cartes from '../views/Cartes.vue'
import Sets from '../views/Sets.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil
    },
    {
      path: '/recherche',
      name: 'recherche',
      component: Recherche
    },
    {
      path: '/cartes',
      name: 'cartes',
      component: Cartes
    },
    {
      path: '/sets',
      name: 'sets',
      component: Sets
    },
    {
      path: '/details/:id',
      name: 'DetailCarte',
      component: () => import('@/components/DetailCarte.vue'),
      props: true
    }
  ]
})

export default router