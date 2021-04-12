// generated on 2019-03-01 using generator-webapp 4.0.0-2
const { src, dest, watch, series, parallel, lastRun } = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const browserSync = require("browser-sync");
const del = require("del");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const { argv } = require("yargs");
const realFavicon = require("gulp-real-favicon");
const fs = require("fs");

// File where the favicon markups are stored
const FAVICON_DATA_FILE = "faviconData.json";

const $ = gulpLoadPlugins();
const server = browserSync.create();

const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";
const isDev = !isProd && !isTest;

const port = argv.port || 3000;

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
function generateFavicon(done) {
  realFavicon.generateFavicon(
    {
      masterPicture: "app/favicon.png",
      dest: "dist/",
      iconsPath: "/",
      design: {
        ios: {
          pictureAspect: "noChange",
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true,
          },
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: "noChange",
          backgroundColor: "#2b5797",
          onConflict: "override",
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false,
            },
          },
        },
        androidChrome: {
          pictureAspect: "noChange",
          themeColor: "#ffffff",
          manifest: {
            startUrl: "https://ic.internetblacksmith.co.uk/",
            display: "standalone",
            orientation: "notSet",
            onConflict: "override",
            declared: true,
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false,
          },
        },
        safariPinnedTab: {
          pictureAspect: "blackAndWhite",
          threshold: 20,
          themeColor: "#5bbad5",
        },
      },
      settings: {
        scalingAlgorithm: "Mitchell",
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false,
      },
      markupFile: FAVICON_DATA_FILE,
    },
    function () {
      done();
    },
  );
}

function styles() {
  return src("app/styles/*.scss")
    .pipe($.plumber())
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe(
      $.sass
        .sync({
          outputStyle: "expanded",
          precision: 10,
          includePaths: ["."],
        })
        .on("error", $.sass.logError),
    )
    .pipe($.postcss([autoprefixer()]))
    .pipe($.if(!isProd, $.sourcemaps.write()))
    .pipe(dest(".tmp/styles"))
    .pipe(server.reload({ stream: true }));
}

function scripts() {
  return src("app/scripts/**/*.js")
    .pipe($.plumber())
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(!isProd, $.sourcemaps.write(".")))
    .pipe(dest(".tmp/scripts"))
    .pipe(server.reload({ stream: true }));
}

const lintBase = files => {
  return src(files)
    .pipe(
      $.eslint({
        fix: true,
        rules: {
          quotes: ["error", "double"],
          indent: ["error", 2],
          semi: ["error", "always"],
        },
      }),
    )
    .pipe(server.reload({ stream: true, once: true }))
    .pipe($.eslint.format())
    .pipe($.if(!server.active, $.eslint.failAfterError()));
};

function lint() {
  return lintBase("app/scripts/**/*.js").pipe(dest("app/scripts"));
}

function lintTest() {
  return lintBase("cypress/**/**.spec.js").pipe(dest("cypress"));
}

function html() {
  return src("app/index.html")
    .pipe($.useref({ searchPath: [".tmp", "app", "."] }))
    .pipe($.if(/\.js$/, $.uglify({ compress: { drop_console: true } })))
    .pipe(
      $.if(/\.css$/, $.postcss([cssnano({ safe: true, autoprefixer: false })])),
    )
    .pipe(
      $.if(
        /\.html$/,
        realFavicon.injectFaviconMarkups(
          JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code,
        ),
      ),
    )
    .pipe(
      $.if(
        /\.html$/,
        $.htmlmin({
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: { compress: { drop_console: true } },
          processConditionalComments: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        }),
      ),
    )
    .pipe(dest("dist"));
}

function images() {
  return src("app/images/**/*", { since: lastRun(images) })
    .pipe($.imagemin())
    .pipe(dest("dist/images"));
}

function fonts() {
  return src("app/fonts/**/*.{eot,svg,ttf,woff,woff2}").pipe(
    $.if(!isProd, dest(".tmp/fonts"), dest("dist/fonts")),
  );
}

function extras() {
  return src(["app/*", "!app/*.html"], {
    dot: true,
  }).pipe(dest("dist"));
}

function clean() {
  return del([".tmp", "dist"]);
}

function measureSize() {
  return src("dist/**/*").pipe($.size({ title: "build", gzip: true }));
}

function startDevServer() {
  server.init({
    notify: false,
    port,
    server: {
      baseDir: [".tmp", "app"],
      routes: {
        "/node_modules": "node_modules",
      },
    },
  });

  watch(["app/*.html", "app/images/**/*", ".tmp/fonts/**/*"]).on(
    "change",
    server.reload,
  );

  watch("app/styles/**/*.scss", styles);
  watch("app/scripts/**/*.js", scripts);
  watch("app/fonts/**/*", fonts);
}

function startTestServer() {
  server.init({
    notify: false,
    open: false,
    port,
    ui: false,
    server: {
      baseDir: [".tmp", "app"],
      routes: {
        "/node_modules": "node_modules",
      },
    },
  });
}

let serve;
if (isDev) {
  serve = series(clean, parallel(styles, scripts, fonts), startDevServer);
} else if (isTest) {
  serve = series(clean, parallel(styles, scripts, fonts), startTestServer);
}

const build = series(
  parallel(
    lint,
    series(parallel(styles, scripts), html),
    generateFavicon,
    images,
    fonts,
    extras,
  ),
  measureSize,
);

exports.lintTest = lintTest;
exports.lint = lint;
exports.serve = serve;
exports.build = build;
exports.default = build;
exports.generateFavicon = generateFavicon;
