<template>
    <v-container id="ListaEmpleados" fluid tag="section">

        <v-btn to="/empleados/crear" fab dark color="#ff5252"><v-icon>mdi-plus</v-icon></v-btn>

        <base-material-card icon="mdi-account-tie" title="Simple Table" class="px-5 py-3">
            <v-simple-table fixed-header class="elevation-3">
                <thead>
                    <tr>
                        <th class="primary--text">Name</th>
                        <th class="primary--text">Position</th>
                        <th class="primary--text">Office</th>
                        <th class="text-right primary--text">Salary</th>
                        <th class="primary--text">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(empleado, index) in empleados" :key="index">
                        <td>{{ empleado.name }}</td>
                        <td>{{ empleado.position }}</td>
                        <td>{{ empleado.office }}</td>
                        <td class="text-right">{{ empleado.salary }}</td>
                        <td>
                            <v-btn :to="{name: 'Editar Empleado', params: {_id: empleado._id, empleado: empleado}}" fab small color="light-blue"><v-icon>mdi-pencil</v-icon></v-btn>

                            <v-btn fab small color="pink accent-3" @click="_id=empleado._id" @click.stop="dialog = true"><v-icon>mdi-delete</v-icon></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>

            <!-- PAGINACION -->
            <div class="text-center">
                <v-container>
                    <v-row justify="center">
                        <v-col cols="8">
                            <v-container class="max-width">
                                <v-pagination
                                    v-model="page"
                                    class="my-4"
                                    :length="totalPages"
                                    :total-visible="(totalPages >= 10 ? 11: totalPages)"
                                ></v-pagination>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
            <!-- PAGINACION -->

        </base-material-card>

        <!-- Ventana de Dialogo -->
        <v-dialog v-model="dialog" max-width="350">
            <v-card>
                <v-card-title class="headline">Desea Eliminar el Empleado</v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn @click="dialog = false">Cancelar</v-btn>
                    <v-btn @click="eliminarEmpleado(_id)" color="error">Aceptar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    import axios from 'axios';

    let url = "http://localhost:3000/api/employees";

    export default {
        name: 'ListaEmpleados',
        data() {
            return {
                empleados: [],
                dialog: false,
                page: 1,
                totalPages: 0,
                token: '',
            }
        },
        watch: {
            page: function (val) {
                this.obtenerEmpleados();
            }
        },
        methods: {
            async obtenerEmpleados() {
                try {
                    this.token = localStorage.getItem('token');

                    const options = {
                        headers: { 'x-access-token': this.token },
                    };

                    const res = await axios.get(`${url}/?page=${this.page}`, options);

                    console.log(res);

                    this.empleados = res.data.results['docs'];

                    this.totalPages = res.data.results.totalPages;

                    if(this.totalPages < this.page) {
                        this.page = this.totalPages;
                    }

                } catch (err) {
                    console.log(err);
                }
            },
            async eliminarEmpleado(_id) {
                try {
                    this.token = localStorage.getItem('token');

                    const options = {
                        headers: { 'x-access-token': this.token },
                    };

                    const res = await axios.delete(`${url}/${_id}`, options);

                    console.log(res);

                    if (res.data.error) {
                        // Mensaje Error
                        // this.muestraAlerta('error', 'Oops...', res.data.message);
                        console.log(`********************* ERROR ******************** ${res.data.message}`);
                    }else {
                        // Mensaje Ok
                        // this.muestraAlerta('success', 'Hecho', 'Articulo Creado con Exito');

                        this.obtenerEmpleados();

                        this.dialog = false;
                    }

                } catch (err) {
                    console.log(err);
                }
            }
        },
        mounted() {
            this.obtenerEmpleados();
        }
    }
</script>
