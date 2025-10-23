const imageListEl = document.getElementById('imageList');

function isDataUrl(s) {
  return typeof s === 'string' && /^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(s.trim());
}

function createRow(dataUrl) {
  const row = document.createElement('div');
  row.className = 'row';
  const img = document.createElement('img');
  img.src = dataUrl.trim();
  img.loading = 'lazy';
  img.decoding = 'async';
  row.appendChild(img);
  return row;
}

function addImages(list) {
  const frag = document.createDocumentFragment();
  for (const u of list) if (isDataUrl(u)) frag.appendChild(createRow(u));
  imageListEl.appendChild(frag);
}

async function loadTxtFile(path) {
  try {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) return;
    const text = (await res.text()).trim();
    if (!text) return;
    const lines = text.split(/\r?\n/).map(s => s.trim()).filter(isDataUrl);
    addImages(lines);
  } catch (err) {
    console.error('womp', path, err);
  }
}

async function loadAllTxtFiles() {
  const txtFiles = ['image.txt', 'image1.txt', 'image2.txt', 'image3.txt', 'image4.txt'];
  for (const file of txtFiles) await loadTxtFile(file);
}

loadAllTxtFiles();
