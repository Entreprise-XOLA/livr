
const routes = [

  {
    path: '/',
    component: () => import('pages/login.vue')
  },
  {
    path: '/home',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Accueil.vue') }
    ]
  },
  {
    path: '/new',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/newcom.vue') }
    ]
  },
  {
    path: '/commandes',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/commandes.vue') }
    ]
  },
  {
    path: '/compte',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/compte.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
