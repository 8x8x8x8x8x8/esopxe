const imageListEl = document.getElementById('imageList');
const popup = document.getElementById('popup');
const popupBtn = document.getElementById('popupBtn');

function isDataUrl(s) {
  return typeof s === 'string' && /^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(s.trim());
}

let nextId = 1;
const registry = new Map();

function createRow(dataUrl) {
  const id = nextId++;
  const row = document.createElement('div');
  row.className = 'row';
  row.dataset.imageId = String(id);
  row.id = 'image-' + id;
  const img = document.createElement('img');
  img.src = dataUrl.trim();
  img.loading = 'lazy';
  img.decoding = 'async';
  const desc = document.createElement('div');
  desc.className = 'desc';
  desc.textContent = 'Image ' + id;
  row.appendChild(img);
  row.appendChild(desc);
  registry.set(id, { id, row, img, desc });
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
  } catch {}
}

async function loadAllTxtFiles() {
  const txtFiles = ['image.txt', 'image2.txt'];
  for (const file of txtFiles) await loadTxtFile(file);
}

function setDescription(id, text) {
  const record = registry.get(id);
  if (record) record.desc.textContent = String(text);
}

const imagesReady = loadAllTxtFiles();

imagesReady.then(() => {
  setDescription(1, 'skig');
  setDescription(2, 'skig');
});

popupBtn.addEventListener('click', () => popup.style.display = 'none');
