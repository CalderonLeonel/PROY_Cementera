<template>
    <v-container>

        <v-row justify="center">
            <v-col md="6" sm="6">
                <v-card class="mx-auto" outlined>


                    <v-app-bar dark color="#00A1B1">


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
                            <v-btn block dark color="#00A1B1" class="mt-3" type="submit">INGRESAR</v-btn>
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
        ],
        passwordrules: [
            value => !!value || 'LA CONTRASEÑA ES REQUERIDA',          
        ],
        user: { user: "", password: ""}
    }),
    methods: {
        async signin() {

            let valid = this.$refs.signinForm.validate();
            try {
            if (valid) {

                const res = await this.axios.post('/signin', this.user);
                if (res.data.NotFount) {
                        this.alert = {
                            show: true,
                            type: 'error',
                            message: res.data.message
                        };
                }
                else {
                    console.log("session: "+ JSON.stringify(res.data));
                    sessionStorage.setItem('session', JSON.stringify(res.data));
                    this.$router.go(0);

                }
                    
               
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
</script>
