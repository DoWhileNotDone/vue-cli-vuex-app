import axios from 'axios';
import { createStore } from 'vuex';

const errorSystem = {
    state: {
        show: false,
        text: '',
    },
    mutations: {
        showError(state, message) {
            state.show = true;
            state.text = message;
        },
    },
};

export default createStore({
    state: {
        students: [],
    },
    getters: {
        students: state =>
            state.students.map(student => {
                return {
                    ...student,
                    fullName: `${student.firstName} ${student.lastName}`,
                };
            }),
        findStudent: state => id =>
            state.students.find(student => student.id == id),
        isLoaded: state => !!state.students.length,
    },
    mutations: {
        setStudents(state, students) {
            state.students = students;
        },
        newStudent(state, student) {
            state.students.push(student);
        },
        editStudent(state, student) {
            const index = state.students.findIndex(s => s.id == student.id);
            state.students[index] = student;
        },
    },
    actions: {
        async getStudents(context) {
            try {
                let students = (
                    await axios.get('http://localhost:3000/students')
                ).data;
                context.commit('setStudents', students);
            } catch (error) {
                context.commit('showError', error.message);
            }
        },
        async createStudent(context, names) {
            const student = (
                await axios.post('http://localhost:3000/students', names)
            ).data;

            context.commit('newStudent', student);
        },
        async editStudent(context, { id, names }) {
            const student = (
                await axios.put(`http://localhost:3000/students/${id}`, names)
            ).data;

            context.commit('editStudent', student);
        },
    },
    modules: {
        error: errorSystem,
    },
});
