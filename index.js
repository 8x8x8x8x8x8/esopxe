const imageListEl = document.getElementById('imageList');

function createRow(dataUrl) {
  const row = document.createElement('div');
  row.className = 'row';
  const img = document.createElement('img');
  img.src = dataUrl.trim();
  img.loading = 'lazy';
  row.appendChild(img);
  return row;
}

function addImage(dataUrl) {
  imageListEl.appendChild(createRow(dataUrl));
}

function addImages(list) {
  list.forEach(addImage);
}

async function loadFromTxt() {
  try {
    const res = await fetch('image.txt', { cache: 'no-store' });
    const text = (await res.text()).trim();
    if (!text) return;
    const lines = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    lines.forEach(addImage);
  } catch (err) {
    console.error('Failed to load image.txt:', err);
  }
}

// Load from image.txt first
loadFromTxt();

// ------------------------------------------
// 🧩 Developer section — add your own images here
// ------------------------------------------
const developerImages = [
  // Example:
  // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB...',

  // You can paste as many as you want:
  // 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
];

// Add them after image.txt loads
addImages(developerImages);
