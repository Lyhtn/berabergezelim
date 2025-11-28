# PowerShell script to optimize header-video.mp4 into a web-friendly MP4 and WebM
# Requires ffmpeg available in PATH

$src = "img/header-video.mp4"
$outMp4 = "img/header-video-720.mp4"
$outWebm = "img/header-video.webm"

if (-not (Test-Path $src)){
  Write-Error "Source file not found: $src"
  exit 1
}

Write-Output "Optimizing to MP4 (H.264, 720p)..."
ffmpeg -y -i $src -c:v libx264 -crf 23 -preset medium -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" -c:a aac -b:a 128k -movflags +faststart $outMp4

Write-Output "Creating WebM (VP9/Opus)..."
ffmpeg -y -i $src -c:v libvpx-vp9 -b:v 0 -crf 33 -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" -c:a libopus -b:a 96k $outWebm

Write-Output "Done. Generated files:"
Get-Item $outMp4, $outWebm | Format-Table Name, Length

Write-Output "Tip: After running, open index.html and ensure the new files are used (index already references optimized filenames)."
