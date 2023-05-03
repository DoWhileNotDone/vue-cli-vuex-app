<template>
    <div>
        <v-col sm8 offset-sm2>
            <v-card>
                <v-toolbar dark>
                    <v-toolbar-title>Edit Student</v-toolbar-title>
                </v-toolbar>
                <v-form v-if="isLoaded">
                    <v-container>
                        <v-row>
                            <v-col xs12 md4>
                                <v-text-field
                                    v-model="firstName"
                                    label="First Name"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col xs12 md4>
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
                <v-container v-else class="text-xs-center">
                    <v-progress-circular
                        :size="70"
                        :width="7"
                        color="purple"
                        indeterminate
                    ></v-progress-circular>
                </v-container>
            </v-card>
        </v-col>
        <br />
        <StudentsList />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import StudentsList from './StudentsList';

export default {
    data() {
        return {
            firstName: '',
            lastName: '',
        };
    },
    async created() {
        const student = this.findStudent(this.$route.params.studentId);

        this.firstName = student.firstName;
        this.lastName = student.lastName;
    },
    computed: {
        ...mapGetters(['isLoaded', 'findStudent']),
    },
    methods: {
        ...mapActions(['editStudent']),
        async submit() {
            this.editStudent({
                id: this.$route.params.studentId,
                names: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                },
            });
        },
    },
    components: {
        StudentsList,
    },
};
</script>
