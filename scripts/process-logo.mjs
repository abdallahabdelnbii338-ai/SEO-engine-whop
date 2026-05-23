import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const source = path.join(root, "public", "logo-source.png");

function removeWhiteBackground(buffer, width, height) {
  const data = Buffer.from(buffer);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const saturation = max - min;

    if (r > 248 && g > 248 && b > 248) {
      data[i + 3] = 0;
    } else if (r > 230 && g > 230 && b > 230 && saturation < 25) {
      const t = (min - 230) / 18;
      data[i + 3] = Math.round(255 * (1 - Math.min(1, Math.max(0, t))));
    }
  }
  return data;
}

async function processPng(size, outPath) {
  const { data, info } = await sharp(source)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cleaned = removeWhiteBackground(data, info.width, info.height);

  await sharp(cleaned, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log(`Wrote ${outPath} (${info.width}x${info.height})`);
}

await processPng(256, path.join(root, "public", "logo.png"));
await processPng(32, path.join(root, "public", "icon.png"));
await processPng(512, path.join(root, "src", "app", "icon.png"));
await processPng(180, path.join(root, "src", "app", "apple-icon.png"));
