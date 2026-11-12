// Cuts a one-page vector PDF (a Figma frame export) into files for components/mdx/ZoomBoard.tsx:
//   <out>/base.png     whole page, 4000px wide (shown while zoomed out)
//   <out>/preview.png  the start area, 1800px wide (shown in the page)
//   <out>/tiles/C-R.png  1024px tiles at full size (1 PDF point = 1px)
// usage: swift scripts/zoom-tiles.swift <pdf> <out> <startX> <startY> <startW>
// startX/Y/W are in full-size px, the same numbers the MDX `start` prop takes.
import AppKit
import Foundation
import PDFKit

let a = CommandLine.arguments
let doc = PDFDocument(url: URL(fileURLWithPath: a[1]))! // keep alive: a page cannot draw once its document is freed
let page = doc.page(at: 0)!
let out = URL(fileURLWithPath: a[2])
let start = CGRect(x: Double(a[3])!, y: Double(a[4])!, width: Double(a[5])!, height: Double(a[5])! * 10 / 16)
let tile = 1024
let box = page.bounds(for: .cropBox)
let w = Int(box.width), h = Int(box.height)

func context(_ w: Int, _ h: Int) -> CGContext {
  let c = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
  c.interpolationQuality = .high
  return c
}
func save(_ img: CGImage, _ url: URL) {
  try! NSBitmapImageRep(cgImage: img).representation(using: .png, properties: [:])!.write(to: url)
}
func scaled(_ img: CGImage, width: Int) -> CGImage {
  let height = Int((Double(img.height) * Double(width) / Double(img.width)).rounded())
  let c = context(width, height)
  c.draw(img, in: CGRect(x: 0, y: 0, width: width, height: height))
  return c.makeImage()!
}

let c = context(w, h)
c.setFillColor(NSColor.white.cgColor)
c.fill(CGRect(x: 0, y: 0, width: w, height: h))
c.translateBy(x: -box.minX, y: -box.minY)
page.draw(with: .cropBox, to: c)
let full = c.makeImage()!

try! FileManager.default.createDirectory(at: out.appendingPathComponent("tiles"), withIntermediateDirectories: true)
save(scaled(full, width: 4000), out.appendingPathComponent("base.png"))
save(scaled(full.cropping(to: start)!, width: 1800), out.appendingPathComponent("preview.png"))
for row in 0..<(h + tile - 1) / tile {
  for col in 0..<(w + tile - 1) / tile {
    let r = CGRect(x: col * tile, y: row * tile, width: min(tile, w - col * tile), height: min(tile, h - row * tile))
    save(full.cropping(to: r)!, out.appendingPathComponent("tiles/\(col)-\(row).png"))
  }
}
print("width \(w) height \(h)")
