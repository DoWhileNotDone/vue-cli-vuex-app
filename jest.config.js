const esModules = ['vuetify'].join('|');

module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
        '^.+\\.(m?js)$': 'babel-jest',
    },
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
