<template>
    <v-container id="ListarArticulos" fluid tag="section">

        <v-btn to="/articulos/crear" fab dark color="#ff5252"><v-icon>mdi-plus</v-icon></v-btn>

        <base-material-card icon="mdi-dog-side" title="Simple Table" class="px-5 py-3">
            <v-simple-table fixed-header class="elevation-3">
                <thead>
                    <tr>
                        <th class="primary--text">ID</th>
                        <th class="primary--text">Descripcion</th>
                        <th class="text-right primary--text">Precio</th>
                        <th class="text-right primary--text">Stock</th>
                        <th class="primary--text">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="articulo in articulos" :key="articulo.id">
                        <td>{{ articulo.id }}</td>
                        <td>{{ articulo.descripcion }}</td>
                        <td class="text-right">{{ articulo.precio }}</td>
                        <td class="text-right">{{ articulo.stock }}</td>
                        <td>
                            <v-btn :to="{name: 'Editar Articulo', params: {id: articulo.id, articulo: articulo}}" fab small color="light-blue"><v-icon>mdi-pencil</v-icon></v-btn>
                            <v-btn fab small color="pink accent-3" @click="id=articulo.id" @click.stop="dialog = true"><v-icon>mdi-delete</v-icon></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </base-material-card>

        <!-- Ventana de Dialogo -->
        <v-dialog v-model="dialog" max-width="350">
            <v-card>
                <v-card-title class="headline">Desea Eliminar el Articulo</v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn @click="dialog = false">Cancelar</v-btn>
                    <v-btn @click="eliminarArticulo(id)" color="error">Aceptar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    import axios from 'axios';

    let url = "http://localhost:3050/api/articulos";

    export default {
        name: 'ListarArticulos',
        data() {
            return {
                articulos: [],
                dialog: false,
                page: 1,
                totalPages: 0,
                token: ''
            }
        },
        methods: {
            async obtenerArticulos() {
                try {
                    this.token = localStorage.getItem('token');

                    const options = {
                        headers: { 'x-access-token': this.token },
                    };

                    const res = await axios.get(`${url}/?page=${this.page}`, options);

                    console.log(res);

                    this.articulos = res.data.results['docs'];

                    this.totalPages = res.data.results.totalPages;

                    if(this.totalPages < this.page) {
                        this.page = this.totalPages;
                    }

                } catch (err) {
                    console.log(err);
                }
            },
            async eliminarArticulo(id) {
                try {
                    await axios.delete(`${url}/${id}`);

                    this.obtenerArticulos();

                    this.dialog = false;
                } catch (err) {
                    console.log(err);
                }
            }
        },
        mounted() {
            this.obtenerArticulos();
        }
    }
</script>
