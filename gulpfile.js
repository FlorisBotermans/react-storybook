/* eslint-disable */ 

/* ---- INCLUDES PACKAGES ---- */
var gulp = require('gulp'),
  del = require('del'),
  bs = require('browser-sync'),                     // Keep multiple browser & devices in sync
  bsConfig = require('./bs-config.js'),             // Browser sync configuration
  zip = require('gulp-zip'),
  sass = require('gulp-dart-sass'),                 // Plugin to able use the SASS & SCSS syntac
  sassLint = require('gulp-sass-lint'),             // Checking for errors and formatting errors in javascript
  header = require('gulp-header'),                  // Create a header above the files
  cleanCSS = require('gulp-clean-css'),             // Compress your CSS
  ejs = require('gulp-ejs'),                        // Converts .ejs templates into html files
  ejsFunctions = require('./app/templates/helpers'),
  rename = require('gulp-rename'),
  svgmin = require('gulp-svgmin'),                  // Compress SVG items
  autoprefixer = require('gulp-autoprefixer'),      // Create prefix voor CSS elements
  // imageMin = require('gulp-imagemin'),              // Compress images // Deprecated

  replace = require('gulp-replace'),                // Strips BOM characters from HTML files
  cache = require('gulp-cached'),                   // Cache already copied files
  index = require('gulp-index'),                    // Generate an index
  config = require('./config.json'),                // Read config.json
  distIsInAssetsPaths = false,
  packageJson = require('./package.json'),              // Read package.json
  compress = require('compression'),                // GZip compression
  named = require('vinyl-named'),
  webpack = require('webpack-stream'),
  webpackConfig = require('./webpack.config.js');


/* ---- SIGNATURE VARIABLE ---- */
var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');


/* ---- HELPERS ---- */
function dests(task, pathOrPaths, subPath) {
  if (typeof pathOrPaths === 'string')
    return task.pipe(gulp.dest(pathOrPaths + subPath));

  var task = task.pipe(gulp.dest(pathOrPaths[0] + subPath));
  for (var i = 1; i < pathOrPaths.length; i++)
    task = task.pipe(gulp.dest(pathOrPaths[i] + subPath));
  return task;
}

const clean = async (paths) => {
  const pathToGlobs = (path) => [`${path}/**`, `!${path}`];

  let directories = [];
  for (var i = 0; i < paths.length; i++) {
    directories = directories.concat(...pathToGlobs(paths[i]));
  }

  console.log(`\nCleaning files at:\n  ${paths.join('\n  ')}\n`);
  return await del(directories, { force: true })
}


/* ---- HTML ---- */
const transpileEjs = () => ejs(
  {
    ...ejsFunctions,
    optimize: config.current.optimize,
    apiBaseUrl: config.current.apiBaseUrl
  },
  {
    delimiter: '%',
    root: 'app/templates'
  }
);
gulp.task('ejs-to-html', () => {
  var task = gulp.src([
    'app/**/*.ejs',
    '!app/templates/**/*.ejs'
  ]);

  if (!distIsInAssetsPaths)
    return task;

  return task.pipe(transpileEjs())
    .pipe(rename({ extname: '.html' }))
    .pipe(replace('﻿', ''))
    .pipe(gulp.dest('dist'));
});

gulp.task('json', () => {
  var task = gulp.src([
    'app/ajax/**/*.json'
  ])
    .pipe(transpileEjs())
    .pipe(rename({ extname: '.json' }));

  if (!distIsInAssetsPaths)
    return task;

  return task.pipe(gulp.dest('dist/ajax'));
});

gulp.task('html-index', gulp.series('ejs-to-html', () => {
  var task = gulp.src('app/*.ejs');

  if (!distIsInAssetsPaths)
    return task;

  return task.pipe(index({
    'relativePath': 'app',
    'prepend-to-output': () => `
    <html><head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head><body>
    <style>
      html {margin: 0;font-family: Calibri,sans-serif;font-size: 62.5%;}
      .pages-index {font-size: 1.8rem;line-height: 2.8rem;font-weight: 400;color: #969696; margin: 25px;} 
      .pages-index H1 {margin: 0;line-height: 1.5;font-size: 4rem;color: #FE1F4C;font-weight: 700;} 
      .pages-index a{color:969696;text-decoration:none;}
      .pages-index a:visited{color:969696;}
      .pages-index a:hover{text-decoration:underline} 
      .pages-index__list {list-style:none;margin:0 25px 0 0;padding:0;column-width: 300px;}
    </style>
    <div class="pages-index">`,
    'title': 'HKU Frontend',
    'title-template': (title) => '<h1>' + title + '</h1><ul class="pages-index__list">',
    'append-to-output': () => '</ul></div></body></html>',

    'section-template': (sectionContent) => sectionContent,
    'section-heading-template': (heading) => '',
    'list-template': (listContent) => listContent,
    'item-template': (_, filename) => {
      const filepath = `/${filename.replace('.ejs', '')}`;
      filename = `${filename[0].toUpperCase()}${filename.substr(1, filename.length - 5).replace(new RegExp('-', 'g'), ' ')}`;
      return `<li><a class="index__item-link" href="${filepath}">${filename}</a></li>`;
    }
  }))
    .pipe(gulp.dest('dist'));
}));


/* ---- SVGS---- */
var svg = (srcs, destsPath, subDestPath) => {
  var task = gulp.src(srcs)
    .pipe(cache('svg'));

  if (config.current.optimize)
    task = task.pipe(svgmin());

  return dests(task, destsPath, `/img${subDestPath}`);
};

gulp.task('svg-content', (callback) => {
  var srcs = ['app/assets/img/content/**/*.svg'];
  return (distIsInAssetsPaths) ? svg(srcs, ['dist/assets'], '/content') : callback();
});

gulp.task('svg-layout', () => {
  var srcs = ['app/assets/img/layout/**/*.svg'];
  var destsPath = config.current.assetsPaths;
  return svg(srcs, destsPath, '/layout');
});

gulp.task('svg', gulp.series('svg-content', 'svg-layout'));


/* ---- SASS ---- */
var sassTask = (srcs, assetsPaths) => {
  var task = gulp.src(srcs)
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: false,
      includePaths: [ 'node_modules' ]
    }))
    .pipe(autoprefixer());
  task = dests(task, assetsPaths, '/css')
    .pipe(bs.stream());
  if (!config.current.optimize)
    return task;

  task = task.pipe(
    cleanCSS({
      compatibility: '*', //Or: ie9
      level: {
        1: {
          all: false, // set all values to `false`
          tidySelectors: true, // turns on optimizing selectors
          specialComments: 0
        }
      }
    })
  )
    .pipe(header(banner, { package: packageJson }))
  return dests(task, assetsPaths, '/css');
}
gulp.task('sass', gulp.series(() => {
  return sassTask([
    'app/assets/sass/*.scss',
    '!app/assets/sass/_*.scss'
  ], config.current.assetsPaths);
}));
gulp.task('sass-lint', () => {
  return gulp.src(['app/assets/sass/**/*.scss',
    '!app/assets/sass/01-settings/*',
    '!app/assets/sass/02-tools/*',
    '!app/assets/sass/03-generic/*',
    '!app/assets/sass/*',])
    .pipe(sassLint({ configFile: 'sass-lint-config.yml' }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});


/* ---- TYPESCRIPT ---- */

//Cache the webpackConfig to avoid memory leaks
let _webpackConfig = undefined;
const getWebpackConfig = () => {
  if(!_webpackConfig) {
    _webpackConfig = webpackConfig(config.current.optimize, config.current.sourcemaps)
  }
  return _webpackConfig;
};
gulp.task('ts', () => {
  var task = gulp.src(['./app/assets/ts/main.ts'])
    .pipe(named())
    .pipe(webpack(getWebpackConfig()));

  return dests(task, config.current.assetsPaths, '/js');
});


/* ---- FONTS ---- */
gulp.task('fonts', () => {
  var task = gulp.src('app/assets/fonts/**/*{.ttf,.woff,.woff2,.otf,.eot,.svg}')
    .pipe(cache('fonts'));
  return dests(task, config.current.assetsPaths, '/fonts');
});


/* ---- IMAGES ---- */
var images = (srcs, destsPath, subDestPath) => {
  var task = gulp.src(srcs)
    .pipe(cache('images'));

  // if (config.current.optimize)
  //   task = task.pipe(imageMin());

  return dests(task, destsPath, `/img${subDestPath}`);
};

gulp.task('images-content', (callback) => {
  var srcs = ['app/assets/img/content/**/*.{jpg,png}'];
  return (distIsInAssetsPaths) ? images(srcs, ['dist/assets'], '/content') : callback();
});

gulp.task('images-layout', () => {
  var srcs = ['app/assets/img/layout/**/*.{jpg,png}'];
  var destsPath = config.current.assetsPaths;
  return images(srcs, destsPath, '/layout');
});

gulp.task('images-favicons', () => {
  var srcs = ['app/assets/img/favicons/**/*.{jpg,png,svg,ico,webmanifest}'];
  var destsPath = config.current.assetsPaths;
  return images(srcs, destsPath, '/favicons');
});

gulp.task('images', gulp.series('images-content', 'images-layout', 'images-favicons'));


/* ---- VIDEOS ---- */
gulp.task('video', () => {
  var task = gulp.src([
    'app/assets/video/**/*.mp4'
  ])
    .pipe(cache('video'));
  return dests(task, config.current.assetsPaths, '/video');
});


/* ---- BROWSER SYNC ---- */
gulp.task('bs-reload', () => {
  bs.reload();
});

gulp.task('browser-sync', (callback) => {
  bs.init(
    {
      server: {
        baseDir: 'dist'
      },
      port: 3000,
      middleware: [
        bsConfig,
        compress()
      ],
      cors: true,
      ui: false,
      //codeSync: false, //Disable reload
      ghostMode: false, //Disable sync
      open: false, //Don't open the browser automatically
      notify: {
        styles: [
          'position:fixed;',
          'top:0;',
          'right:0;',
          'padding:5px 10px;',
          'background:#000;',
          'color:#fff;',
          'opacity:.5;',
          'z-index:1000;',
          'pointer-events:none;'
        ]
      },
      snippetOptions: {
        rule: {
          match: /<\/head>/i,
          fn: function (snippet, match) {
            return snippet + match;
          }
        }
      },
    });
  //bs.stream({ stream: true, once: true, match: '*.css' });
  callback()
});


/* --- WATCH --- */
const gulpWatch = (glob, callback) => {
  const watchers = []
  const handler = () => {
    watchers.forEach(watcher => {
      watcher.close()
    })
    watchers.length = 0

    setTimeout(() => {
      callback()
      setWatchers() 
    }, 100)
  }
  const setWatchers = () => {
    watchers.push(gulp.watch(glob).on('add', handler));
    watchers.push(gulp.watch(glob).on('unlink', handler));
    watchers.push(gulp.watch(glob).on('change', handler));
  }
  setWatchers()
};

gulp.task('watch', () => {
  gulpWatch(['app/**/*.ejs', '!app/ajax/**'], gulp.series('html-index', 'bs-reload'));
  gulpWatch('app/ajax', gulp.series('json', 'ejs-to-html'));
  gulpWatch('app/assets/sass', gulp.series('sass', 'sass-lint'));
  gulpWatch('app/assets/img', gulp.series('images', 'svg', 'bs-reload'));
  gulpWatch('app/assets/icons', gulp.series('sass', 'ts', 'html-index', 'bs-reload'));
  gulpWatch('app/assets/video', gulp.series('video', 'bs-reload'));
  gulpWatch('app/assets/fonts', gulp.series('fonts', 'bs-reload'));
  gulpWatch('app/assets/ts/**/*', gulp.series('ts', 'html-index', 'bs-reload'));
  
  setTimeout(() => {
    console.log('Exit with ctrl+c');
  }, 10)
});


/* ---- CLEAN TARGET FOLDER ---- */
gulp.task('clean', async () => {
  const paths = [...config.current.assetsPaths]
  paths.push('temp')
  if(distIsInAssetsPaths) {
    paths.splice(paths.indexOf('dist/assets'), 1, 'dist')
  }
  return await clean(paths);
});


/* ---- ZIP FOR PROTO ---- */
gulp.task('zip', (callback) => {
  gulp.src(['./*{.js,.json,.config}', 'dist/**/*'], { base: './' })
    .pipe(zip('proto-deployment.zip'))
    .pipe(gulp.dest('./'))
    .on('end', () => {
      var filepath = `${process.cwd()}\\proto-deployment.zip`;
      console.log(`\x1b[32mZip saved to: ${filepath} \x1b[0m`);
      callback()
    });
});


/* ---- SUBTASKS ---- */
gulp.task('build',
  gulp.series(
    'clean',
    'json',
    'images',
    'svg',
    'fonts',
    'video',
    'sass-lint',
    'sass',
    'ts',
    'html-index', // Depends on 'ts' in /app/templates/helpers/react.js
  )
);


/* ---- STATS ---- */
gulp.task('publish-stats', (callback) => {
  console.log('\nPublished to:');
  for (var i = 0; i < config.current.assetsPaths.length; i++)
    console.log(`${config.current.assetsPaths[i]}`);
  console.log('\n');
  callback()
});


/* ---- CONFIGURATION ---- */
gulp.task('setconfig', (callback) => {
  const name = process.argv.length >= 3 ? process.argv[2] : 'debug';
  config.current = config[name];
  if(!config.current) {
    throw new Error(`Config "${name}" does not exist in config.json`);
  } else {
    console.log(`\nUsing configuration in config.json[${name}]\n`)
  }

  distIsInAssetsPaths = (config.current.assetsPaths.filter((dest) => dest.indexOf('dist/') === 0).length > 0);
  callback();
});


/* ---- DEFAULT TASKS ---- */
gulp.task('debug', gulp.series(
  'setconfig',
  'browser-sync',
  'build',
  'watch'
));

gulp.task('release', gulp.series(
  'setconfig',
  'browser-sync',
  'build',
  'watch'
));

gulp.task('publish', gulp.series(
    'setconfig',
    'build',
    'publish-stats'
));

gulp.task('proto', gulp.series(
  'setconfig',
  'build',
  'zip'
));

gulp.task('host', () => {
  process.env.PORT = 80;
  require('./server');
});

gulp.task('default', gulp.series('debug'));
