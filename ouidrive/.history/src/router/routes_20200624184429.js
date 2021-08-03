
const routes = [

  {
    path: '/',
    component: () => import('pages/login.vue')
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Accueil.vue') }
    ]
  },

  {
    path: '/feedback',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/feedback.vue') }
    ]
  },

  {
    path: '/help',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/help.vue') }
    ]
  },

  {
    path: '/new',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/newcom.vue') }
    ]
  },
  {
    path: '/commandes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/commandes.vue') }
    ]
  },
  {
    path: '/inscription',
    component: () => import('pages/inscription.vue')
  },
  {
    path: '/compte',
    component: () => import('layouts/MainLayout.vue'),
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
