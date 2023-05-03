<template>
    <div>
        <v-col sm8 offset-sm2>
            <v-card>
                <v-toolbar dark>
                    <v-toolbar-title>New Student</v-toolbar-title>
                </v-toolbar>
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col xs12 md4>
                                <v-text-field
                                    v-model="firstName"
                                    label="First Name"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="lastName"
                                    label="Last Name"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-btn @click="submit">submit</v-btn>
                </v-form>
            </v-card>
        </v-col>
        <br />
        <StudentsList />
    </div>
</template>

<script>
import StudentsList from './StudentsList';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            firstName: '',
            lastName: '',
        };
    },
    methods: {
        async submit() {
            this.createStudent({
                firstName: `${this.firstName}`,
                lastName: `${this.lastName}`,
            });
            this.firstName = '';
            this.lastName = '';
        },
        ...mapActions(['createStudent']),
    },
    components: {
        StudentsList,
    },
};
</script>
