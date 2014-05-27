module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                options: {
                    banner: "/* jquery uloader plugin */\n",
                    separator: ';'
                },
                files: {
                    'dist/jquery-uloader.js' : ['src/js/jquery-uloader.js']
                }
            },
            css: {
                options: {
                    banner: "/* jquery uloader css */\n"
                },
                files: {
                    'src/css/css-loaders/css-loader.css': ['src/css/css-loaders/css/*.css', 'src/css/css-loaders/css-loader-fix.css'],
                    'dist/jquery-uloader.css': ['src/css/jquery-uloader.css', 'src/css/spinkit.css', 'src/css/css-loaders/css-loader.css']
                }
            }
        },
        uglify: {
            uloader: {
                files: {
                    'dist/jquery-uloader.min.js': ['src/js/jquery-uloader.js']
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'dist/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/',
                ext: '.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('dist-js', ['concat:js', 'uglify']);
    grunt.registerTask('dist-css', ['concat:css', 'cssmin']);

    grunt.registerTask('dist', ['dist-css', 'dist-js']);

    grunt.registerTask('default', ['dist']);

};