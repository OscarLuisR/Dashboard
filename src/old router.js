import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('@/views/dashboard/Index'),
            children: [
                // Dashboard
                {
                    name: 'Dashboard',
                    path: '',
                    component: () => import('@/views/dashboard/Dashboard'),
                },
                // Listar Articulos
                {
                    name: 'Listar Articulos',
                    path: '/articulos',
                    component: () => import('@/views/articulos/ListarArticulos'),
                },
                // Crear Articulo
                {
                    name: 'Crear Articulo',
                    path: '/articulos/crear',
                    component: () => import('@/views/articulos/CrearArticulo'),
                },
                // Editar Articulo
                {
                    name: 'Editar Articulo',
                    path: '/articulos/editar/:id',
                    component: () => import('@/views/articulos/EditarArticulo'),
                },
                // Lista de Empleados
                {
                    name: 'Lista de Empleados',
                    path: '/empleados',
                    component: () => import('@/views/empleados/ListaEmpleados'),
                },
                // Editar Empleado
                {
                    name: 'Editar Empleado',
                    path: '/empleados/editar/:_id',
                    component: () => import('@/views/empleados/EditarEmpleado'),
                },
                // Crear Empleado
                {
                    name: 'Crear Empleado',
                    path: '/empleados/crear',
                    component: () => import('@/views/empleados/CrearEmpleado'),
                },

                // Pages
                {
                    name: 'User Profile',
                    path: 'pages/user',
                    component: () => import('@/views/dashboard/pages/UserProfile'),
                },
                {
                    name: 'Notifications',
                    path: 'components/notifications',
                    component: () => import('@/views/dashboard/component/Notifications'),
                },
                {
                    name: 'Icons',
                    path: 'components/icons',
                    component: () => import('@/views/dashboard/component/Icons'),
                },
                {
                    name: 'Typography',
                    path: 'components/typography',
                    component: () => import('@/views/dashboard/component/Typography'),
                },
                // Tables
                {
                    name: 'Regular Tables',
                    path: 'tables/regular-tables',
                    component: () => import('@/views/dashboard/tables/RegularTables'),
                },
                // Maps
                {
                    name: 'Google Maps',
                    path: 'maps/google-maps',
                    component: () => import('@/views/dashboard/maps/GoogleMaps'),
                },
                // Upgrade
                {
                    name: 'Upgrade',
                    path: 'upgrade',
                    component: () => import('@/views/dashboard/Upgrade'),
                },
            ],
        },
    ],
})
