<!-- eslint-disable -->
<template>
    <div>
        <v-app>
            <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
                <div>
                    <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
                        <v-tabs-slider color="purple darken-4"></v-tabs-slider>

                        <v-tab v-for="(i, index) in tabs" :key="index">
                            <v-icon large>{{ i.icon }}</v-icon>
                            <div class="caption py-1">{{ i.name }}</div>
                        </v-tab>

                        <v-tab-item>
                            <v-card class="px-4">
                                <v-card-text>
                                    <v-form ref="loginForm" v-model="valid" lazy-validation>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                                            </v-col>

                                            <v-col cols="12">
                                                <v-text-field v-model="loginPassword" :rules="[rules.required, rules.min]" type="password" name="input-10-1" label="Password" hint="At least 5 characters" counter @click:append="show1 = !show1"></v-text-field>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6" xsm="12"></v-col>

                                            <v-spacer></v-spacer>

                                            <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                                <v-btn x-large block :disabled="!valid" color="success" @click="validate"> Login </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </div>
            </v-dialog>
        </v-app>
    </div>
</template>

<!-- eslint-disable -->
<script>
    import axios from 'axios';

    export default {
        name: 'Login',
        data() {
            return {
                error: false,
                error_msg: '',
                dialog: true,
                tab: 0,
                tabs: [
                    {name:"Login", icon:"mdi-account"} /*,
                    {name:"Register", icon:"mdi-account-outline"}*/
                ],
                valid: false,
                loginPassword: 'admin',
                loginEmail:  'admin@admin.com',
                loginEmailRules: [v => !!v || "Required", v => /.+@.+\..+/.test(v) || "E-mail must be valid"],
                /* emailRules: [v => !!v || "Required", v => /.+@.+\..+/.test(v) || "E-mail must be valid"], */
                show1: false,
                rules: {
                    required: value => !!value || "Required",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                }
            }
        },
        methods: {
            async validate() {
                if (this.$refs.loginForm.validate()) {
                    try {
                        let login = {
                            email: this.loginEmail,
                            password: this.loginPassword
                        }

                        const res = await axios.post('http://localhost:3040/api/auth/login', login);

                        console.log(res)

                        if (res.data.error) {
                            // OJO OJO OJO
                            // MOSTRAR EL ERROR EN UN ALERT
                            this.error = true;
                            this.error_msg = res.data.message;
                        }else {
                            localStorage.token = res.data.results[0].token;

                            this.$router.push('/index');
                        }

                    } catch (err) {
                        // OJO OJO OJO
                        // MOSTRAR EL ERROR EN UN SWEALERT
                        console.log(err);
                    };
                }
            },
            /* reset() {
                this.$refs.form.reset();
            },
            resetValidation() {
                this.$refs.form.resetValidation();
            } */
        },
        mounted() {
            this.valid = false;
        }
    }
</script>

<style scoped>

</style>
