import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import path from 'path';

var webpack = require('webpack-stream');
const $ = gulpLoadPlugins();

gulp.task("clockSubmit", () => {
  gulp.src(['src/**/*.js'])
    .pipe($.babel({
      "presets": ["es2015"]
    }))
    .pipe($.replace("'use strict'",''))
    .pipe($.concat('clockSubmit.js'))
    .pipe($.umd({
      dependencies: function(file) {
        return [{
          name:"",
          amd:""
        }];
      },
      exports: function(file) {
        return 'clockSubmit';
      },
      namespace: function(file) {
        return 'clockSubmit';
      },
      template: path.join(__dirname, 'umd/templates/clockSubmit.js')
    }))
    .pipe(gulp.dest(''))
    .pipe($.replace("'use strict'",''))
    .pipe($.uglify())
    .pipe($.concat('clockSubmit.min.js'))
    .pipe(gulp.dest(''));
});

// 重新加载
const reload = browserSync.reload;

gulp.task('serve', ['clockSubmit'], () => {
  browserSync({
    port: 900, //端口
    host: 'localhost',
    browser: ["chrome"], // 在chrome、firefix下打开该站点
    server: {
      baseDir: [''],
      index: 'index.html',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  })

  // 每当修改以下文件夹下的文件时就会刷新浏览器;
  gulp.watch('src/**/*.js', ['clockSubmit']);

  gulp.watch([
    'app/**/*.*'
  ]).on('change', reload);
});

gulp.task('server', ['serve'], () => {});