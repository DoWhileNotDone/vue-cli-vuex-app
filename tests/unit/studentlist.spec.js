import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/lib/components/index.mjs';

import StudentsList from '@/components/StudentsList';

test('The student list component lists a student from the store', () => {
    const vuetify = createVuetify({
        components,
    });

    const store = createStore({
        state() {
            return {
                students: [
                    {
                        firstName: 'Dave',
                        lastName: 'Last',
                        id: 0,
                    },
                ],
            };
        },
        getters: {
            students: state =>
                state.students.map(student => {
                    return {
                        ...student,
                        fullName: `${student.firstName} ${student.lastName}`,
                    };
                }),
            isLoaded: state => !!state.students.length,
        },
    });

    const wrapper = mount(StudentsList, {
        global: {
            plugins: [store, vuetify],
        },
    });

    // Assert the student is within the component
    expect(wrapper.text()).toContain('Dave');
});
