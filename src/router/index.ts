import { createRouter, createWebHistory } from 'vue-router';
const Home = () => import('@/pages/home.vue');
const Lobby = () => import('@/pages/lobby.vue');
const Game = () => import('@/pages/game.vue');

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/lobby',
			name: 'lobby',
			component: Lobby,
		},
		{
			path: '/game',
			name: 'game',
			component: Game,
		},
	],
});

export default router;
