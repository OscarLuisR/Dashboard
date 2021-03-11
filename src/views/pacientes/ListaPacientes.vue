<template>
    <v-container id="ListaPacientes" fluid tag="section">

        <v-btn to="/pacientes/crear" fab dark color="#ff5252"><v-icon>mdi-plus</v-icon></v-btn>

        <base-material-card icon="mdi-account-tie" title="Simple Table" class="px-5 py-3">
            <v-simple-table fixed-header class="elevation-3">
                <thead>
                    <tr>
                        <th class="primary--text">Nombre</th>
                        <th class="primary--text">DNI</th>
                        <th class="primary--text">Direccion</th>
                        <th class="primary--text">Codigo Postal</th>
                        <th class="primary--text">Telefono</th>
                        <th class="primary--text">Genero</th>
                        <th class="primary--text">Correo</th>
                        <th class="primary--text">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(paciente, index) in pacientes" :key="index">
                        <td>{{ paciente.nombre }}</td>
                        <td>{{ paciente.dni }}</td>
                        <td>{{ paciente.direccion }}</td>
                        <td>{{ paciente.codigopostal }}</td>
                        <td>{{ paciente.telefono }}</td>
                        <td>{{ paciente.genero }}</td>
                        <td>{{ paciente.correo }}</td>
                        <td>
                            <v-btn :to="{name: 'Editar Paciente', params: {_id: paciente._id, paciente: paciente}}" fab small color="light-blue"><v-icon>mdi-pencil</v-icon></v-btn>

                            <v-btn fab small color="pink accent-3" @click="_id=paciente._id" @click.stop="dialog = true"><v-icon>mdi-delete</v-icon></v-btn>
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
                <v-card-title class="headline">Desea Eliminar el Paciente</v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn @click="dialog = false">Cancelar</v-btn>
                    <v-btn @click="eliminarPaciente(_id)" color="error">Aceptar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    import axios from 'axios';

    let url = "http://localhost:3040/api/pacientes";

    export default {
        name: 'ListaPacientes',
        data() {
            return {
                pacientes: [],
                dialog: false,
                page: 1,
                totalPages: 0,
                token: '',
            }
        },
        watch: {
            page: function (val) {
                this.obtenerPacientes();
            }
        },
        methods: {
            async obtenerPacientes() {
                try {
                    this.token = localStorage.getItem('token');

                    const options = {
                        headers: { 'x-access-token': this.token },
                    };

                    const res = await axios.get(`${url}/?page=${this.page}`, options);

                    console.log(res);

                    this.pacientes = res.data.results['docs'];

                    this.totalPages = res.data.results.totalPages;

                    if(this.totalPages < this.page) {
                        this.page = this.totalPages;
                    }

                } catch (err) {
                    console.log(err);
                }
            },
            async eliminarPaciente(_id) {
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

                        this.obtenerPacientes();

                        this.dialog = false;
                    }

                } catch (err) {
                    console.log(err);
                }
            }
        },
        mounted() {
            this.obtenerPacientes();
        }
    }
</script>
