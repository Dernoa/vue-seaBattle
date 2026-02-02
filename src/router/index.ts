import { createRouter, createWebHistory } from 'vue-router';
import home from '@/pages/home.vue';
import lobby from '@/pages/lobby.vue';
import game from '@/pages/game.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: home,
		},
		{
			path: '/lobby',
			component: lobby,
		},
		{
			path: '/game',
			component: game,
		},
	],
});

export default router;
