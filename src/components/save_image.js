export function exportCanvasAsPNG(id, fileName) {
  const canvasElement = document.getElementById(id);

  const MIME_TYPE = 'image/png';

  const imgURL = canvasElement.toDataURL(MIME_TYPE);

  const dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(
    ':',
  );

  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}

const download = document.getElementById('download');

download.addEventListener('click', () => {
  exportCanvasAsPNG('canvas_block', 'file');
});
