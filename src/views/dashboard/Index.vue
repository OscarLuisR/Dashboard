<!-- eslint-disable -->
<template>
    <v-app>
        <dashboard-core-app-bar />

        <dashboard-core-drawer />

        <dashboard-core-view />

        <dashboard-core-settings />
    </v-app>
</template>

<!-- eslint-disable -->
<script>
    export default {
        name: "DashboardIndex",

        components: {
            DashboardCoreAppBar: () => import(/* webpackChunkName: "AppBar" */ "./components/core/AppBar"),
            DashboardCoreDrawer: () => import(/* webpackChunkName: "Drawer" */ "./components/core/Drawer"),
            DashboardCoreSettings: () => import(/* webpackChunkName: "Settings" */ "./components/core/Settings"),
            DashboardCoreView: () => import(/* webpackChunkName: "View" */ "./components/core/View"),
        },

        data: () => ({
            expandOnHover: false,
        }),
    };
</script>
