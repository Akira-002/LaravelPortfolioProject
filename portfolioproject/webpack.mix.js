const mix = require('laravel-mix');
const writeFilePlugin = require('write-file-webpack-plugin');


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/style.scss', 'public/css')
    .sourceMaps()
    // .version()
    .webpackConfig({

        plugins: [
            new writeFilePlugin()
        ]
    });

if (mix.inProduction()) {
    mix.version();
}
