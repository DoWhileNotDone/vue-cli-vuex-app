import { createRouter, createWebHashHistory } from 'vue-router';

import StudentsList from '@/components/StudentsList';

const routes = [
    {
        path: '/',
        name: 'students',
        component: StudentsList,
    },
    {
        path: '/students/new',
        name: 'new-student',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "about" */ '../components/NewStudent.vue'
            ),
    },
    {
        path: '/students/:studentId/edit',
        name: 'edit-student',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "about" */ '../components/EditStudent.vue'
            ),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
