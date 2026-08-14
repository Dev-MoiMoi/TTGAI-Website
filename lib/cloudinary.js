/**
 * Shared Cloudinary upload helper.
 *
 * Uploads a file to Cloudinary using the site's public upload preset
 * (VITE_CLOUDINARY_UPLOAD_PRESET). This is the SAME unsigned flow the
 * newsletter submission form uses — fine for the public, so it's fine for
 * admin image management too (an uploaded file only affects the site when an
 * admin assigns it to a slot).
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ttgai_submissions';

export const ALLOWED_UPLOAD_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * Upload a file to Cloudinary.
 * @param {File} file
 * @param {Object} [opts]
 * @param {string} [opts.folder]     — Cloudinary folder, e.g. 'ttgai-site-images'
 * @param {string} [opts.tags]       — space/comma separated tags
 * @param {string} [opts.context]    — pipe-separated key=value metadata
 * @param {(pct:number)=>void} [opts.onProgress]
 * @returns {Promise<string>} the secure_url of the uploaded asset
 */
export function uploadImage(file, { folder = 'ttgai-uploads', tags = '', context = '', onProgress } = {}) {
  return new Promise((resolve, reject) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_PRESET) {
      reject(new Error('cloudinary_not_configured'));
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_PRESET);
    data.append('folder', folder);
    if (tags) data.append('tags', tags);
    if (context) data.append('context', context);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable && typeof onProgress === 'function') {
        onProgress(Math.round((ev.loaded / ev.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          resolve(JSON.parse(xhr.responseText).secure_url);
        } catch (err) {
          reject(err);
        }
      } else {
        reject(new Error(`upload_failed_${xhr.status}`));
      }
    };
    xhr.onerror = () => reject(new Error('upload_network_error'));
    xhr.send(data);
  });
}
