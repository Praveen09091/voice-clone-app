const fs = require('fs');
const { createCanvas } = require('canvas');

// Function to create a logo image and save it to file
function createLogo(size, filename) {
  console.log(`Creating ${filename} with size ${size}x${size}`);
  
  // Create a canvas with the specified dimensions
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Create a gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#3a7bd5');  // Blue
  gradient.addColorStop(1, '#f83d7b');  // Pink
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Add text
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size/4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PK', size/2, size/2);
  
  // Save the image to a file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
  
  console.log(`Created ${filename}`);
}

// Create logo files
createLogo(192, 'public/logo192.png');
createLogo(512, 'public/logo512.png');

console.log('Logo generation complete!'); 