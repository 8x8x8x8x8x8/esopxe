const imageListEl = document.getElementById('imageList');

function isDataUrl(s) {
  return typeof s === 'string' && /^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(s.trim());
}

function createRow(dataUrl, index) {
  const row = document.createElement('div');
  row.className = 'row';
  const img = document.createElement('img');
  img.src = dataUrl.trim();
  img.loading = 'lazy';
  img.decoding = 'async';
  const desc = document.createElement('div');
  desc.className = 'desc';
  desc.textContent = 'Image ' + (index + 1);
  row.appendChild(img);
  row.appendChild(desc);
  return row;
}

function addImages(list) {
  const frag = document.createDocumentFragment();
  list.forEach((u, i) => {
    if (isDataUrl(u)) frag.appendChild(createRow(u, i));
  });
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
  const txtFiles = ['image.txt', 'image1.txt', 'image2.txt', 'image3.txt', 'image4.txt'];
  for (const file of txtFiles) await loadTxtFile(file);
}

loadAllTxtFiles();

const popup = document.getElementById('popup');
const popupBtn = document.getElementById('popupBtn');
popupBtn.addEventListener('click', () => popup.style.display = 'none');
