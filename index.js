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

function addImage(u) {
  if (isDataUrl(u)) imageListEl.appendChild(createRow(u));
}

function addImages(list) {
  if (!Array.isArray(list)) return;
  const frag = document.createDocumentFragment();
  for (const u of list) if (isDataUrl(u)) frag.appendChild(createRow(u));
  imageListEl.appendChild(frag);
}

async function loadTxtFile(path) {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) return;
  const text = (await res.text()).trim();
  if (!text) return;
  const lines = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean).filter(isDataUrl);
  addImages(lines);
}

async function loadTxtFiles(files) {
  for (const f of files) await loadTxtFile(f);
}

const txtFiles = ['image.txt'];
const developerImages = [];

loadTxtFiles(txtFiles).then(() => addImages(developerImages));

window.addImage = addImage;
window.addImages = addImages;
