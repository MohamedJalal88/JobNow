# Load System.Drawing for image resizing
Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\aysha\OneDrive\Desktop\PDD\public\logo.png"

# Helper function to resize image
function Resize-Image {
    param (
        [string]$SourceFile,
        [string]$DestinationFile,
        [int]$Width,
        [int]$Height
    )
    
    $srcImg = [System.Drawing.Image]::FromFile($SourceFile)
    $destImg = New-Object System.Drawing.Bitmap($Width, $Height)
    $graphic = [System.Drawing.Graphics]::FromImage($destImg)
    
    # Set high quality resize options
    $graphic.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphic.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphic.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphic.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    # Draw resized image
    $graphic.DrawImage($srcImg, 0, 0, $Width, $Height)
    
    # Save image
    $destImg.Save($DestinationFile, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Clean up
    $graphic.Dispose()
    $destImg.Dispose()
    $srcImg.Dispose()
}

# Ensure Android Directories exist and write mipmaps
$androidRes = "c:\Users\aysha\OneDrive\Desktop\PDD\android\app\src\main\res"
$androidSizes = @{
    "mipmap-mdpi" = 48
    "mipmap-hdpi" = 72
    "mipmap-xhdpi" = 96
    "mipmap-xxhdpi" = 144
    "mipmap-xxxhdpi" = 192
}

Write-Host "Resizing Android App Icons..."
foreach ($dir in $androidSizes.Keys) {
    $size = $androidSizes[$dir]
    $destDir = Join-Path $androidRes $dir
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    }
    
    # Save standard, round and foreground launcher icons
    Resize-Image $sourcePath (Join-Path $destDir "ic_launcher.png") $size $size
    Resize-Image $sourcePath (Join-Path $destDir "ic_launcher_round.png") $size $size
    Resize-Image $sourcePath (Join-Path $destDir "ic_launcher_foreground.png") $size $size
}

# Create build directory for Electron
$buildDir = "c:\Users\aysha\OneDrive\Desktop\PDD\build"
if (-not (Test-Path $buildDir)) {
    New-Item -ItemType Directory -Force -Path $buildDir | Out-Null
}

# Generate 256x256 PNG for ICO
$tempPng = Join-Path $buildDir "icon_256.png"
Write-Host "Creating 256x256 PNG for ICO..."
Resize-Image $sourcePath $tempPng 256 256

# Write ICO container format
Write-Host "Creating build/icon.ico..."
$pngBytes = [System.IO.File]::ReadAllBytes($tempPng)
$pngSize = $pngBytes.Length

# 22-byte ICO header + directory entry for a single 256x256 PNG image
$icoHeader = New-Object byte[] 22
$icoHeader[0] = 0   # Reserved
$icoHeader[1] = 0
$icoHeader[2] = 1   # Type: Icon (1)
$icoHeader[3] = 0
$icoHeader[4] = 1   # Count: 1 image
$icoHeader[5] = 0

# Image entry
$icoHeader[6] = 0   # Width: 256 (represented by 0)
$icoHeader[7] = 0   # Height: 256 (represented by 0)
$icoHeader[8] = 0   # Color count: 0 (no palette)
$icoHeader[9] = 0   # Reserved
$icoHeader[10] = 1  # Color planes: 1
$icoHeader[11] = 0
$icoHeader[12] = 32 # Bits per pixel: 32
$icoHeader[13] = 0

# PNG size (4 bytes, little endian)
$icoHeader[14] = [byte]($pngSize -band 0xff)
$icoHeader[15] = [byte](($pngSize -shr 8) -band 0xff)
$icoHeader[16] = [byte](($pngSize -shr 16) -band 0xff)
$icoHeader[17] = [byte](($pngSize -shr 24) -band 0xff)

# PNG offset (4 bytes, little endian, always 22 bytes offset for 1 image entry)
$icoHeader[18] = 22
$icoHeader[19] = 0
$icoHeader[20] = 0
$icoHeader[21] = 0

# Write the header followed by PNG data
$fs = New-Object System.IO.FileStream((Join-Path $buildDir "icon.ico"), [System.IO.FileMode]::Create)
$fs.Write($icoHeader, 0, $icoHeader.Length)
$fs.Write($pngBytes, 0, $pngBytes.Length)
$fs.Close()

# Clean up temporary PNG
Remove-Item $tempPng -ErrorAction SilentlyContinue

Write-Host "Icon generation completed successfully!"
