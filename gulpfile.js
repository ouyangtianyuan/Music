var gulp = require('gulp');
var imagemin =  require("gulp-imagemin");
var htmlclean = require("gulp-htmlclean");
var newer = require("gulp-newer");
var uglify = require("gulp-uglify");
var debug = require("gulp-strip-debug");
var concat = require("gulp-concat");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var connect = require("gulp-connect");
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');


var deMode = process.env.NODE_ENV == "development"; //开发环境

console.log(deMode);

var folder = {
    src:"./src/",//开发目录文件夹
    build:"./build/"//压缩打包后的目录文件夹
}



//gulp.src()//读文件
//gulp.dest()//写文件
//gulp.task()//任务
//gulp.watch()//监听



//流读取文件
gulp.task("images",function(){
    gulp.src(folder.src + "images/*")
    .pipe(connect.reload())
    .pipe(newer((folder.src + "images/*")))
    .pipe(imagemin())
    .pipe(gulp.dest(folder.build + "images"))
})
gulp.task("html",function(){
    var page = gulp.src(folder.src + "html/*")
    .pipe(connect.reload())
    if(!deMode){
        page.pipe(htmlclean())
        
    }
    page.pipe(gulp.dest(folder.build + "html"))
})
gulp.task("js",function(){
    var page = gulp.src(folder.src + "js/*")
    .pipe(connect.reload())
    if(!deMode){
        page.pipe(debug())
        .pipe(uglify())
    }
    page.pipe(gulp.dest(folder.build + "js"))
})
gulp.task("css",function(){
    var options = [autoprefixer(),cssnano()]
    var page=gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
    if(!deMode){
        page.pipe(postcss(options))
    }
    page.pipe(gulp.dest(folder.build + "css"))
})

gulp.task('fonts', function () {
    gulp.src(folder.src + "fonts/**")
      .pipe(gulp.dest(folder.build + "fonts"))
});

gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "css/*",["css"]);
    gulp.watch(folder.src + "js/*",["js"]);
    gulp.watch(folder.src + "images/*",["images"]);
})

gulp.task("server",function(){
    connect.server({
        port:"8090",
        livereload:true
    })
    
})

gulp.task("default",["html","images","js","css","fonts","watch","server"],function(){
   
})

