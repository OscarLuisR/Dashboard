<template>
    <v-container>
        <base-material-card icon="mdi-clipboard-text" title="Simple Table" class="px-5 py-3">

        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Editar Empleado</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarEmpleado">
                    <v-text-field
                        v-model="empleado.name"
                        label="Name"
                        type="text"
                        outlined
                        required>
                    </v-text-field>

                    <v-text-field
                        v-model="empleado.position"
                        label="Position"
                        type="text"
                        outlined
                        required>
                    </v-text-field>

                    <v-text-field
                        v-model="empleado.office"
                        label="Office"
                        type="text"
                        outlined
                        required>
                    </v-text-field>

                    <v-text-field
                        v-model="empleado.salary"
                        label="Salary"
                        type="number"
                        prefix="$"
                        outlined
                        required>
                    </v-text-field>

                    <v-card-actions>
                        <v-btn to="/empleados" color="blue-grey" class="mr-4">Cancelar</v-btn>
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

    let url = "http://localhost:3000/api/employees";

    export default {
        name: 'EditarEmpleado',
        data() {
            return {
                empleado: {
                    _id: null,
                    name: null,
                    position: null,
                    office: null,
                    salary: null
                },
                token: null
            }
        },
        methods: {
            async guardarEmpleado() {
                try {
                    this.token = localStorage.getItem('token');

                    const options = {
                        headers: { 'x-access-token': this.token },
                    };

                    const _id = this.empleado._id;
                    let router = this.$router;

                    delete this.empleado._id;

                    const res = await axios.put(`${url}/${_id}`, this.empleado, options);

                    console.log(res);

                    if (res.data.error) {
                        // Mensaje Error
                        // this.muestraAlerta('error', 'Oops...', res.data.message);
                        console.log(`********************* ERROR ******************** ${res.data.message}`);
                    }else {
                        // Mensaje Ok
                        // this.muestraAlerta('success', 'Hecho', 'Articulo Creado con Exito');

                        router.push('/empleados');
                    }

                } catch (err) {
                    console.log(err);
                }
            }
        },
        mounted() {
            this.empleado = this.$route.params.empleado;
        }
    }
</script>
