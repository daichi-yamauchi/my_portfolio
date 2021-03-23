// プラグインの読み込み
const gulp = require("gulp");

// sassプラグインの読み込み
const sass = require("gulp-sass");
sass.compiler = require("sass"); // dart-sassを使用
const sassGlob = require("gulp-sass-glob");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");

// postCssプラグインの読み込み
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssdeclsort = require("css-declaration-sorter");
const mqpacker = require("css-mqpacker");

// 画像圧縮プラグインの読み込み
var imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");
const svgmin = require("gulp-svgmin");

//browser-syncのプラグイン読み込み
const browserSync = require("browser-sync");

// ディレクトリ定義
var paths = {
  sassSrcDir: "src/sass", // sassのソースディレクトリ
  sassDst1: "docs/css", // sassのコンパイルファイルの保存先ディレクトリ
  imageSrc: "src/images", // 画像のソースディレクトリ
  imageDst: "docs/images", // 圧縮画像の保存先ディレクトリ
  serverSrc: "docs", // browser-syncのルートディレクトリ
  indexFile: "index.html", // browser-syncのインデックスファイル
};

// Sassコンパイルタスクの定義
const compile = (done) => {
  const postcssPlugins = [
    // browserlistはpackage.jsonに記載[推奨]
    autoprefixer({
      cascade: false,
    }),
    cssdeclsort({
      order: "smacss",
    }),
    mqpacker(),
  ];

  gulp
    .src(paths.sassSrcDir + "/**/*.scss", {
      sourcemaps: true,
      base: paths.sassSrcDir,
    })
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(sassGlob()) // Sassの@importにおけるglobを有効にする
    .pipe(sass())
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest(paths.sassDst1, { sourcemaps: "." }));
  done();
};

// 画像の圧縮タスク
const imageminTask = (done) => {
  var srcGlob = paths.imageSrc + "/**/*.+(jpg|jpeg|png|gif)";
  var dstGlob = paths.imageDst;
  gulp
    .src(srcGlob)
    .pipe(changed(dstGlob))
    .pipe(
      imagemin([
        pngquant({
          quality: [0.7, 0.85], // 画質
          speed: 1, // スピード
        }),
        mozjpeg({
          quality: 85, // 画質
          progressive: true,
        }),
      ])
    )
    .pipe(gulp.dest(dstGlob));
  done();
};

// svgの圧縮タスク
const svgminTask = (done) => {
  var srcGlob = paths.imageSrc + "/**/*.svg";
  var dstGlob = paths.imageDst;
  gulp
    .src(srcGlob)
    .pipe(changed(dstGlob))
    .pipe(svgmin())
    .pipe(gulp.dest(dstGlob));
  done();
};

// BrowserSyncタスクの設定
const browserSyncTask = (done) => {
  browserSync({
    server: {
      baseDir: paths.serverSrc,
      index: paths.indexFile,
    },
  });
  done();
};

// BrowserSyncリロードタスクの設定
const reload = (done) => {
  browserSync.reload();
  done();
};

// ファイル変更監視タスクの定義;
const start = gulp.series(compile, imageminTask, svgminTask, browserSyncTask);

// ファイル変更監視タスクの定義
const watch = (done) => {
  gulp.watch(paths.sassSrcDir + "/**", gulp.series(compile, reload));
  gulp.watch(
    paths.imageSrc + "/**/*",
    gulp.series(imageminTask, svgminTask, reload)
  );
  gulp.watch(paths.serverSrc + "/**/*.html", reload);
  done();
};

// ファイル変更監視タスクのエクスポート
exports.default = gulp.series(start, watch);
