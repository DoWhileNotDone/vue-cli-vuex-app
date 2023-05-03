<template>
    <v-app>
        <v-toolbar app>
            <v-btn flat to="/">Students List</v-btn>
            <v-btn flat to="/students/new">New Student</v-btn>
        </v-toolbar>
        <v-main>
            <br />
            <router-view :key="$route.fullPath" />
        </v-main>
        <v-snackbar v-model="error.show">{{ error.text }}</v-snackbar>
    </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'App',
    async created() {
        await this.getStudents();
    },
    methods: {
        ...mapActions(['getStudents']),
    },
    computed: {
        ...mapState(['error']),
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
