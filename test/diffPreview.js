
const globby = require('globby')
const resemble = require('node-resemble-js')
const fs = require('fs')
const PNG = require('pngjs').PNG
const pargs = process.argv
const diffDir = './test/screenshots-diff/'
const PWD = process.env.PWD

const diffPreviewTemplate = require('./screendiff/diffPreviewTemplate.js').diffPreviewTemplate

// const srcImgs = pargs[2]
// const compareImgs = pargs[3]
//
// function removePattern(str) {
//   return str.split('*.png').join('')
// }

globby(`${diffDir}*.png`).then((files) => {
  console.log(process.env.PWD);
  console.log(files);
  const html = diffPreviewTemplate({
    files,
    pwd: PWD
  })

  fs.writeFile('test/screendiff/diff.html', html, 'utf-8', (err, data) => {
    console.log(err, data);
  })


  // files.forEach((file1) => {
    // Read source
    // fs.readFile(file1, (err, data) => {
    //   // Read new
    //   const srcPng = PNG.sync.read(data)
    //   const file2 = file1.replace(removePattern(srcImgs), removePattern(compareImgs))
    //   const diffFile = file1.replace(removePattern(srcImgs), diffDir)
    //   console.log(diffFile);
    //   fs.readFile(file2, (err2, data2) => {
    //
    //     resemble(file1).compareTo(file2).onComplete(function(diffData) {
    //       console.log(diffData);
    //       if (diffData.misMatchPercentage === '0.00') {
    //         console.log(`PASS: ${file1} matched ${file2}`)
    //       } else {
    //         console.log(`FAIL: ${file1} did not match ${file2}`)
    //         const diffImg = data.getDiffImage().pack().pipe(fs.createWriteStream(diffFile));
    //       }
    //     });
    //     // var diff = new PNG({width: srcPng.width, height: srcPng.height});
    //     // pixelmatch(data, data2, diff.data, srcPng.width, srcPng.height)
    //     // console.log(diff.data);
    //     // diff.pack().pipe(fs.createWriteStream(diffFile));
    //   })
    // })
  // })

}).catch((e) => {
  console.log(e);
})

// pixelmatch(img1, img2, diff, 800, 600, {threshold: 0.1})