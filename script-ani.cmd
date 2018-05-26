#!/usr/bin/env node
const fs = require('fs')
const http = require('http')
const { entlist } = require('./script-entlist.js')
const minimist = require('./script-minimist.js')
const fetch = require('./script-node-fetch.js')        

const args = minimist(process.argv.slice(2), {
  alias: {a: 'action', o: 'stdout', d: 'debug', v: 'version', h: 'help', s: 'serve', t: 'mdeeFile', z: ['zindex', 'index']},
  boolean: ['l', 'o', 'd', 'v', 'm', 'serve'],
  string: ['t', 'p', 'z', 'a'],
  default: {t: 0.1, p: 6}
})

const usage = `
Usage: entlist [options]

Options:
 -a, --action        Script action in {samplify,entlist,mdfy,mdeefy}
 -d, --debug         Debug output
 -v, --version       Output the version
 -h, --help          Show this help message
 -f, --files         Files to entities
 -m, --appdir        App directory path
 -t, --mdeeFile      File to extract md to README eg. -a mdeefy -t halo.ent
 -l, --libsFile      Output libs file
 -p, --entsFile      Output entity file
 -s, --serve         Server
 -o, --stdout        Output to stdout
 -z, --zindex        From zfile index
`.trim()

const entlistFile = args._[0]
if (args.version) console.log(entlistVersion)
if (args.help) process.exit(console.log(usage))

const options = {
  layers: args.layers,
  debug: args.debug,
  appdir: args.appdir || '.',
  entsFile: args.entsFile || 'script-ents.js',
  libsFile: args.libsFile || 'script-enls.js',
  mdeeFile: args.mdeeFile,
  serve: args.serve,
  enxlFile: args.enxlFile || 'script-enxl.js',
  zindex: args.zindex,
  action: args.action
}

let appdir = options.appdir // app dir
let entsFile = options.entsFile // ents file
let libsFile = options.libsFile // libs file
let enxlFile = options.enxlFile // ext libs file
let mdeeFile = options.mdeeFile // to md file
let zFile = options.zindex // from zindex file
let action = options.action // action

if (action === 'samplify') {    // ........... samplify
  let files = fs.readdirSync(appdir)

  let libsInXFile = fs.readFileSync(enxlFile, 'utf8')
  let toText = libsInXFile
  let fromText = '<script src="script-enls.js"></script>'
  let regex = new RegExp('^.*' + zFile + '.*.html', 'i')
  let fzs = files.filter(d => regex.test(d))
  if (fzs.length > 0) {
    let fz = fzs[0]
    if (2 && 2) console.log('zfile', fz)

    let outzFile = 'index.html'
    let zfileTxt = fs.readFileSync(fz, 'utf8')
    let newzText = zfileTxt.replace(fromText, toText)
    fs.writeFileSync(outzFile, newzText)
  }
} else if (action === 'entlist') { // ........... entlist

  let testpattern = new RegExp('(.*)\.test\.(.*)$', 'i')

  let files = fs.readdirSync(appdir)
      .filter(d => !testpattern.test(d))

  let gens = [

    { // libs:
      tags: ['d3', 'topojson', 'three'],
      file: libsFile,
      regCode: '\\b.*'
    },

    { // ents
      tags: ['control', 'data', 'force', 'geo', 'lib', 'muon', 'halo', 'x', 'render'],
      file: entsFile,
      regCode: '\\b.*'
    }

  ]

  entlist(files, gens, args)
} else if (action === 'mdfy') {
  // md string begin
  let header = `
# d3animas

- space-time manifolds

## a story by

- sifbuilder

based on an original idea from

- [x] [Mike Bostock's d3] (https://github.com/d3)

with references to

- [x] [Mike Bostock] (https://bl.ocks.org/mbostock)
- [x] [Ricardo Cabello] (https://threejs.org/)
- [x] [Vasco Asturiano] (https://bl.ocks.org/vasturiano)
- [x] [Philippe Rivière] (https://bl.ocks.org/fil)

# License

- MIT` // md string end

  let scriptpattern = new RegExp('^' + 'script', 'i')
  let htmlpattern = new RegExp('(.*)\.html$', 'i')
  let jspattern = new RegExp('(.*)\.js$', 'i')
  let pattern = '// ///.*'
  let regex = new RegExp(pattern, 'i')

  const isDirectory = d => fs.lstatSync(d).isDirectory()
  const isFile = d => fs.lstatSync(d).isFile()

  let files = fs.readdirSync(appdir)
    .filter(file => isFile(file))
    .filter(d => !scriptpattern.test(d))
    .filter(d => jspattern.test(d) || htmlpattern.test(d))

  let readmefile = 'README.markdown'

  let readmetxt = header + '\n'

  for (let i = 0; i < files.length; i++) {
    let fileName = files[i]
    let fileTxt = fs.readFileSync(fileName, 'utf8')

    let nameFindPattern = /md:(\{filename\})/mg
    let nameReplacePattern = /md:\{filename\}/i
    var nameArr
    while ((nameArr = nameFindPattern.exec(fileTxt)) !== null) {
      fileTxt = fileTxt.replace(nameReplacePattern, fileName)
    }

    const mdpattern = /\/\/md:(.*)/mg // // md:
    var arr
    while ((arr = mdpattern.exec(fileTxt)) !== null) {
      console.log('0', arr[1])
      readmetxt += arr[1] + '\n'
    }
  }

  fs.writeFileSync(readmefile, readmetxt)
  
} else if (action === 'entest') {

  let scriptpattern = new RegExp('^' + 'script', 'i')
  let testpattern = new RegExp('(.*)\.test.*\.js$', 'i')
  let pattern = '// ///.*'
  let regex = new RegExp(pattern, 'i')

  const isDirectory = d => fs.lstatSync(d).isDirectory()
  const isFile = d => fs.lstatSync(d).isFile()

  let files = fs.readdirSync(appdir)
    .filter(file => isFile(file))
    .filter(d => !scriptpattern.test(d))
    .filter(d => testpattern.test(d))

  for (let i = 0; i < files.length; i++) {
      let fileName = files[i]
      const { test } = require('./' + fileName)
      test()
  }
  
} else if (action === 'mdeefy') {
  let files = fs.readdirSync(appdir)
  let infile = mdeeFile
  let outfile = 'README.markdown'

  let regex = new RegExp('^.*' + infile + '.*(.html|js)?', 'i')

  let fzs = files.filter(d => regex.test(d))

  let header = ''
  let newLine = '\n'
  let endOfLine = '  '
  let outText = header + newLine

  for (let i = 0; i < fzs.length; i++) {
    let fileName = fzs[i]
    let fileTxt = fs.readFileSync(fileName, 'utf8')

    let nameFindPattern = /md:(\{filename\})/mg // filename
    let nameReplacePattern = /md:\{filename\}/i // ignoring case
    var nameArr
    while ((nameArr = nameFindPattern.exec(fileTxt)) !== null) {
      fileTxt = fileTxt.replace(nameReplacePattern, fileName)
    }

    const mdpattern = /\/\/.?md:(.*)/mg // // md (global multiline)
    var arr
    while ((arr = mdpattern.exec(fileTxt)) !== null) {
      outText += arr[1] + endOfLine + newLine
    }
  }

  fs.writeFileSync(outfile, outText)
} else if (action === 'uncomment') {
  let scriptpattern = new RegExp('^' + 'script', 'i')
  let htmlpattern = new RegExp('(.*)\.html$', 'i')
  let jspattern = new RegExp('(.*)\.js$', 'i')
  let pattern = '// ///.*'
  let regex = new RegExp(pattern, 'i')

  const isDirectory = d => fs.lstatSync(d).isDirectory()
  const isFile = d => fs.lstatSync(d).isFile()

  let files = fs.readdirSync(appdir)
    .filter(file => isFile(file))
    .filter(d => !scriptpattern.test(d))
    .filter(d => jspattern.test(d) || htmlpattern.test(d))

  for (let i = 0; i < files.length; i++) {
    let fileName = files[i]
    let fileTxt = fs.readFileSync(fileName, 'utf8')
    let findPattern = /^.*(0|1) \&\& 1.*$/mg // pattern: (0|1) && 1
    let replacePattern = /^.*(0|1) \&\& 1.*$/i // pattern: (0|1) && 1

    let exp = RegExp('^.*(0|1) \&\& 1.*$', 'mg')
    let infile = exp.test(fileTxt)

    if (infile) {
      var arr
      while ((arr = findPattern.exec(fileTxt)) !== null) {
        let toreplace = arr[0]
        fileTxt = fileTxt.replace(toreplace, '')
      }
      fs.writeFileSync(fileName, fileTxt)
    }
  }
} else if (action === 'serve') {
  console.log('serve')

      let file = 'zindex503-3symplectic.html'
      fs.readFile(file,function (err, html){
          if (err) {
              throw err;
          }
          http.createServer(function(request, response) {
              response.writeHeader(200, {"Content-Type": "text/html"});
              response.write(html);
              response.end();
          }).listen(8000);
      });


  console.log("Running at Port 8000");
}
