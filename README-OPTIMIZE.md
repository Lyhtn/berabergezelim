Video & asset optimization

1) Optimize hero video (requires ffmpeg)
- Open PowerShell in project root and run:
  cd d:\berabergezelim-main
  .\scripts\optimize-video.ps1

This produces `img/header-video-720.mp4` and `img/header-video.webm` optimized for web (720p, reasonable bitrate).

2) Preload & multi-source
- `index.html` is updated to include `<source>` tags for WebM then optimized MP4 then original MP4. Browsers will pick the best supported format.

3) Lazy loading
- Images across pages have `loading="lazy"` where appropriate to defer offscreen images.

4) Further improvements you can run locally
- Image conversion to WebP (use `cwebp` or `imagemagick`), minify CSS/JS (use terser/clean-css), and enable gzip on your hosting.

If you want, I can prepare an additional PowerShell script to batch-convert images to WebP and update HTML markup automatically. Say the word and I'll add it.