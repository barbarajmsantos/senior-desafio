var header = [
    'assets/js/plugins/jquery/dist/jquery.js'
];

var footer = [
    'assets/js/plugins/bootstrap/dist/js/bootstrap.js',
    'assets/js/plugins/moment/min/moment-with-locales.min.js',
    'assets/js/plugins/simpleWeather/jquery.simpleWeather.js',
    'assets/js/plugins/select2/dist/js/select2.min.js',
    'assets/js/custom.js'
];

var cssPlugins = [
    'assets/js/plugins/select2/dist/css/select2.min.css'
]

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                livereload: 35729
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['less','concat','autoprefixer']
            },
            js: {
                files: ['assets/js/*.js', 'assets/js/libs/*.js'],
                tasks: ['concat']
            },
            less: {
                files: ['assets/less/*.less', 'assets/less/**/*.less'],
                tasks: ['less','autoprefixer']
            }
        },
         autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            multiple_files: {
                expand:     true,
                flatten:    true,
                src:        'assets/css/!*.css',
                dest:       'assets/css/'
            }
        },


        less: {
            all: {
                files: {
                    "assets/css/custom.css": "assets/less/custom/custom.less"
                }
            }
        },

        concat: {
            options: {
                separator:''
            },
            header: {
                src:  header,
                dest: 'assets/js/min/header.js'
            },
            footer: {
                src:  footer,
                dest: 'assets/js/min/footer.js'
            },
            cssPLugins: {
                src: cssPlugins,
                dest: 'assets/css/cssPlugins.css'
            }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel:  7
                },
                files: [{
                    expand:   true,
                    cwd:      'assets/images/',
                    src:      '**/*.png',
                    dest:     'assets/images/',
                    ext:      '.png'
                }]
            },
            jpg: {
                options: {
                    progressive:  true
                },
                files: [{
                    expand:   true,
                    cwd:      'assets/images/',
                    src:      '**/*.jpg',
                    dest:     'assets/images/',
                    ext:      '.jpg'
                }]
            }
        },

        cssmin: {
            pages: {
                expand: true,
                cwd:    'assets/css/',
                src:    ['*.css'],
                dest:   'assets/css/',
                ext:    '.css'
            }
        },

        uglify: {
            my_target: {
                files: {
                    'assets/js/min/footer.js': 'assets/js/min/footer.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['less','concat','imagemin','cssmin','uglify']);
    grunt.registerTask('dev', ['less','concat']);
};