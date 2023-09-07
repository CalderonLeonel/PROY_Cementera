<template>
    <v-container>

        <v-row justify="center">
            <v-col md="6" sm="6">
                <v-card class="mx-auto" outlined>


                    <v-app-bar dark color="orange darken-2">


                        <v-toolbar-title>CREDENCIALES</v-toolbar-title>

                        <v-spacer></v-spacer>


                    </v-app-bar>
                    <v-row justify="center">
                        <v-img class="ma-6" width="100" height="100" contain src="../assets/logodrymix.png"></v-img>
                    </v-row>

                    <v-card-text>
                        <v-form class="ma-3" @submit.prevent="signin()" ref="signinForm" lazy-validation>

                            <v-text-field label="USUARIO" prepend-icon="mdi-account-key" :rules="namerules"
                                v-model="user.user">
                            </v-text-field>
                            <v-text-field label="CONTRASEÑA" prepend-icon="mdi-lock" type="password" :rules="passwordrules"
                                v-model="user.password">
                            </v-text-field>
                            <v-btn block class="primary mt-3" type="submit">INGRESAR</v-btn>
                            <v-alert text v-model="alert.show" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
                        </v-form>

                    </v-card-text>
                </v-card>

            </v-col>

        </v-row>
    </v-container>
</template>
  
<script>


export default {
    data: () => ({
        alert: { show: false, message: '', type: '' },
        namerules: [
            value => !!value || 'EL USUARIO ES REQUERIDO',
            // value =>(value && value.lemgth>=4 || 'EL USUARIO ES MUY CORTO') 
        ],
        passwordrules: [
            value => !!value || 'LA CONTRASEÑA ES REQUERIDA',
            // value =>(value && value.lemgth>4 || 'LA CONTRASEÑA ES MUY CORTA')          
        ],
        user: { user: "", password: "" }
    }),
    methods: {
        async signin() {

            let valid = this.$refs.signinForm.validate();

            if (valid) {
                try {
                    const res = await this.axios.post('/signin', this.user);
                    if (res.data.NotFount) {
                        this.alert = {
                            show: true,
                            type: 'error',
                            message: res.data.message
                        };
                    }
                    else {
                        sessionStorage.setItem('session', JSON.stringify(res.data));

                        this.$router.push('/');
                        this.$router.go(0);

                    }
                } catch (error) {
                    this.alert = {
                        show: true,
                        type: "error",
                        message: error.response.data.message
                    };
                }
            }



        }
    }
}
</script>