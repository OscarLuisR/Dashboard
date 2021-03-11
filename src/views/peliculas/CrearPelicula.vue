<template>
    <v-container>
        <base-material-card icon="mdi-clipboard-text" title="Simple Table" class="px-5 py-3">

        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Crear Pelicula</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarPelicula">
                    <v-text-field
                        v-model="pelicula.titulo"
                        label="Titulo"
                        type="text"
                        outlined
                        required>
                    </v-text-field>

                    <v-text-field
                        v-model="pelicula.categoria"
                        label="Categoria"
                        type="text"
                        outlined
                        required>
                    </v-text-field>

                    <v-text-field
                        v-model="pelicula.urlImagen"
                        label="Url"
                        type="text"
                        outlined
                        required>
                    </v-text-field>

                    <v-textarea
                        v-model="pelicula.descripcion"
                        label="Descripcion"
                        required
                        full-width
                        outlined
                    ></v-textarea>

                    <v-text-field
                        v-model="pelicula.rating"
                        label="Rating"
                        type="number"
                        outlined
                        required>
                    </v-text-field>

                    <v-card-actions>
                        <v-btn to="/peliculas" color="blue-grey" class="mr-4">Cancelar</v-btn>
                        <v-btn type="submit" color="indigo" class="mr-4">Guardar</v-btn>
                    </v-card-actions>
                </form>
            </v-col>
        </v-row>
        </base-material-card>
    </v-container>
</template>

<script>
    import axios from 'axios';

    let url = "http://localhost:3020/api/peliculas";

    export default {
        name: 'CrearPelicula',
        data() {
            return {
                pelicula: {
                    titulo: null,
                    urlImagen: null,
                    categoria: null,
                    descripcion: null,
                    rating: null
                },
                token: null
            }
        },
        methods: {
            async guardarPelicula() {
                try {
                    this.token = localStorage.getItem('token');

                    const options = {
                        headers: { 'x-access-token': this.token },
                    };

                    let router = this.$router;

                    const res = await axios.post(url, this.pelicula, options);

                    console.log(res);

                    if (res.data.error) {
                        // Mensaje Error
                        // this.muestraAlerta('error', 'Oops...', res.data.message);
                        console.log(`********************* ERROR ******************** ${res.data.message}`);
                    }else {
                        // Mensaje Ok
                        // this.muestraAlerta('success', 'Hecho', 'Articulo Creado con Exito');

                        router.push('/peliculas');
                    }

                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
</script>
