import path from 'path'
import fs from 'fs'
import SVGtoPDF from 'svg-to-pdfkit'
import PDFDocument from 'pdfkit'

// PDF
PDFDocument.prototype.addSVG = function (svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options)
}
const createPDF = (endPath, pathSvg) => new Promise((resolve, reject) => {
  fs.readFile(pathSvg, { encoding: 'utf-8' }, function (error, svg) {
    if (error) return reject(error)
    var pdf = new PDFDocument({
      compress: false,
      info: {
        Title: 'Hermosa Tarjeta ♥',
        Author: 'TarjetasExplosivas.com'
      }
    })

    pdf.addSVG(svg, 0, 0, {
      // 0 612 792
      width: 612,
      height: 792,
      preserveSpace: true
      // compress: false
    })

    // Stream contents to a file
    pdf.pipe(
      fs.createWriteStream(endPath)
    )
      .on('finish', function () {
        console.log('PDF closed')
        resolve()
      })

    // Close PDF and write file.
    pdf.end()
  })
})

export default (work, endPath, pathSvg1, pathSvg2, pathSvg3, pathSvg4) => new Promise(async (resolve, reject) => {
  // creamos pdfs
  await Promise.all([
    createPDF(path.resolve(endPath, `Tarjeta-A.pdf`), pathSvg1),
    createPDF(path.resolve(endPath, `Tarjeta-B.pdf`), pathSvg2),
    createPDF(path.resolve(endPath, `Sobre-A.pdf`), pathSvg3),
    createPDF(path.resolve(endPath, `Sobre-B.pdf`), pathSvg4)
  ])

  resolve()
})
