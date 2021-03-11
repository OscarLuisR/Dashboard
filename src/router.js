import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        // Login
        {
            path: '/',
            name: 'Login',
            component: () => import(/* webpackChunkName: "Login" */ '@/views/login/Login')
        },
        {
            path: '/index',
            name: 'Index',
            component: () => import(/* webpackChunkName: "Index" */ '@/views/dashboard/Index'),
            children: [
                // Dashboard
                {
                    name: 'Dashboard',
                    path: '',
                    component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/dashboard/Dashboard'),
                },
                // Lista de Empleados
                {
                    name: 'Lista de Empleados',
                    path: '/empleados',
                    component: () => import(/* webpackChunkName: "ListaEmpleados" */ '@/views/empleados/ListaEmpleados'),
                },
                // Editar Empleado
                {
                    name: 'Editar Empleado',
                    path: '/empleados/editar/:_id',
                    component: () => import(/* webpackChunkName: "EditarEmpleado" */ '@/views/empleados/EditarEmpleado'),
                },
                // Crear Empleado
                {
                    name: 'Crear Empleado',
                    path: '/empleados/crear',
                    component: () => import(/* webpackChunkName: "CrearEmpleado" */ '@/views/empleados/CrearEmpleado'),
                },
                // Lista de Peliculas
                {
                    name: 'Lista de Peliculas',
                    path: '/peliculas',
                    component: () => import(/* webpackChunkName: "ListaPeliculas" */ '@/views/peliculas/ListaPeliculas'),
                },
                // Editar Pelicula
                {
                    name: 'Editar Pelicula',
                    path: '/peliculas/editar/:id',
                    component: () => import(/* webpackChunkName: "EditarPelicula" */ '@/views/peliculas/EditarPelicula'),
                },
                // Crear Pelicula
                {
                    name: 'Crear Pelicula',
                    path: '/peliculas/crear',
                    component: () => import(/* webpackChunkName: "CrearPelicula" */ '@/views/peliculas/CrearPelicula'),
                },
                // Lista de Pacientes
                {
                    name: 'Lista de Pacientes',
                    path: '/pacientes',
                    component: () => import(/* webpackChunkName: "ListaPacientes" */ '@/views/pacientes/ListaPacientes'),
                },
                // Editar Paciente
                {
                    name: 'Editar Paciente',
                    path: '/pacientes/editar/:id',
                    component: () => import('@/views/pacientes/EditarPaciente'),
                },
                // Crear Paciente
                {
                    name: 'Crear Paciente',
                    path: '/pacientes/crear',
                    component: () => import('@/views/pacientes/CrearPaciente'),
                },
                // Lista de Mascotas
                {
                    name: 'Lista de Mascotas',
                    path: '/mascotas',
                    component: () => import('@/views/mascotas/ListaMascotas'),
                },
                // Editar Mascota
                {
                    name: 'Editar Mascota',
                    path: '/mascotas/editar/:id',
                    component: () => import('@/views/mascotas/EditarMascota'),
                },
                // Crear Mascota
                {
                    name: 'Crear Mascota',
                    path: '/mascotas/crear',
                    component: () => import('@/views/mascotas/CrearMascota'),
                },
                // Pages
                {
                    name: 'User Profile',
                    path: '/pages/user',
                    component: () => import('@/views/dashboard/pages/UserProfile'),
                },
                {
                    name: 'Notifications',
                    path: '/components/notifications',
                    component: () => import('@/views/dashboard/component/Notifications'),
                },
                {
                    name: 'Icons',
                    path: '/components/icons',
                    component: () => import('@/views/dashboard/component/Icons'),
                },
                {
                    name: 'Typography',
                    path: '/components/typography',
                    component: () => import('@/views/dashboard/component/Typography'),
                },
                // Tables
                {
                    name: 'Regular Tables',
                    path: '/tables/regular-tables',
                    component: () => import('@/views/dashboard/tables/RegularTables'),
                },
                // Maps
                {
                    name: 'Google Maps',
                    path: '/maps/google-maps',
                    component: () => import('@/views/dashboard/maps/GoogleMaps'),
                },
                // Upgrade
                {
                    name: 'Upgrade',
                    path: '/upgrade',
                    component: () => import('@/views/dashboard/Upgrade'),
                },
            ],
        },
    ],
});
