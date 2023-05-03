<template>
    <v-col sm8 offset-sm2>
        <v-card>
            <v-toolbar dark>
                <v-toolbar-title>Students</v-toolbar-title>
            </v-toolbar>
            <v-list v-if="isLoaded">
                <v-list-item
                    v-for="(student, index) in students"
                    :to="`/students/${index}/edit`"
                    :key="student.id"
                >
                    <v-list-item-title
                        v-text="`${student.fullName}`"
                    ></v-list-item-title>
                </v-list-item>
            </v-list>
            <div v-else>
                <v-container>
                    <v-progress-circular
                        class="my-10"
                        indeterminate
                    ></v-progress-circular>
                </v-container>
            </div>
        </v-card>
    </v-col>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'StudentList',

    computed: {
        ...mapGetters(['students', 'isLoaded']),
    },
};
</script>
