// These relative latest-release links remain stable as new versions are published.
const repository = 'https://github.com/RaysConnect/rays-connect';
for (const link of document.querySelectorAll('[data-asset]')) {
  link.href = `${repository}/releases/download/${link.dataset.release || 'v1.1.0'}/${link.dataset.asset}`;
}
document.querySelector('#repository-link').href = repository;
document.querySelector('#release-notes').href = `${repository}/releases/latest`;
document.querySelector('#checksums').href = `${repository}/releases/latest/download/SHA256SUMS.txt`;
// A local manifest avoids spending an API request on every visitor.
fetch('release.json').then(response => {
  if (!response.ok) throw new Error('manifest unavailable');
  return response.json();
}).then(release => {
  if (typeof release.version === 'string') document.querySelector('#release-version').textContent = release.version;
}).catch(() => { /* The bundled version and stable download links remain usable offline. */ });
