<template>
    <v-container>
        <base-material-card icon="mdi-clipboard-text" title="Simple Table" class="px-5 py-3">

        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Editar Articulo</h1>

            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarArticulo">
                    <v-text-field
                        v-model="articulo.descripcion"
                        label="Descripcion"
                        type="text"
                        outlined
                        required>
                    </v-text-field>

                    <v-text-field
                        v-model="articulo.precio"
                        label="Precio"
                        type="number"
                        prefix="$"
                        outlined
                        required>
                    </v-text-field>

                    <v-text-field
                        v-model="articulo.stock"
                        label="Stock"
                        type="number"
                        outlined
                        required>
                    </v-text-field>

                    <v-card-actions>
                        <v-btn to="/articulos" color="blue-grey" class="mr-4">Cancelar</v-btn>
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

    let url = "http://localhost:3000/api/articulos";

    export default {
        name: 'EditarArticulos',
        data() {
            return {
                articulo: {
                    id: null,
                    descripcion: null,
                    precio: null,
                    stock: null
                },
            }
        },
        methods: {
            async guardarArticulo() {
                try {
                    const id = this.articulo.id;
                    let router = this.$router;

                    delete this.articulo.id;

                    await axios.put(`${url}/${id}`, this.articulo);

                    router.push('/articulos');
                } catch (err) {
                    console.log(err);
                }
            }
        },
        mounted() {
            this.articulo = this.$route.params.articulo;
        }
    }
</script>
