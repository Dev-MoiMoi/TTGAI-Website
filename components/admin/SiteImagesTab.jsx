import React, { useState, useEffect, useRef } from 'react';
import { adminApi } from '../../lib/admin';
import { getSessionToken } from '../../lib/security';
import { uploadImage } from '../../lib/cloudinary';
import { refreshSiteImages } from '../../lib/siteImages';
import { defaultSiteImage } from '../../lib/defaultImages';

const SECTION_ORDER = ['Hero / Background', 'Events', 'Team', 'Partners', 'General'];

const SectionHeader = ({ name, count }) => (
  <div className="adm-si-section-hd">
    <h3 className="adm-si-section-title">{name}</h3>
    <span className="adm-si-section-count">{count}</span>
  </div>
);

const SlotCard = ({ slot, onSaved }) => {
  const [draft, setDraft] = useState(slot.image_url || '');
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const fileRef = useRef(null);

  const dirty = (draft || '') !== (slot.image_url || '');
  const isDefault = !draft && !slot.image_url;
  const preview = draft || slot.image_url || defaultSiteImage(slot.slug) || '';

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setUploading(true);
    setProgress(0);
    try {
      const url = await uploadImage(file, {
        folder: 'ttgai-site-images',
        context: `slot=${slot.slug}|label=${slot.label}`,
        onProgress: setProgress,
      });
      setDraft(url);
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setError('');
    setNotice('');
    setSaving(true);
    try {
      const res = await adminApi.updateSiteImage(getSessionToken(), slot.slug, draft);
      await refreshSiteImages();
      onSaved(res);
      setNotice('Saved.');
    } catch (err) {
      console.error('Save failed:', err);
      setError('Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const clearSlot = () => {
    setError('');
    setDraft('');
  };

  return (
    <div className={`adm-si-card${dirty ? ' adm-si-card--dirty' : ''}`}>
      <div className="adm-si-thumb">
        {preview ? (
          <img src={preview} alt={slot.label} />
        ) : (
          <div className="adm-si-thumb-empty">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>No image</span>
          </div>
        )}
        {isDefault && preview && <span className="adm-si-default-badge">DEFAULT</span>}
        {uploading && (
          <div className="adm-si-upload-overlay">
            <div className="adm-si-upload-progress">{progress}%</div>
          </div>
        )}
      </div>

      <div className="adm-si-card-body">
        <h4 className="adm-si-label">{slot.label}</h4>
        <code className="adm-si-slug">{slot.slug}</code>

        <input
          className="adm-si-input"
          type="url"
          placeholder="Paste image URL…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={uploading || saving}
        />

        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          style={{ display: 'none' }}
          onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ''; }}
        />

        <div className="adm-si-actions">
          <button
            type="button"
            className="adm-si-btn adm-si-btn--upload"
            onClick={() => fileRef.current?.click()}
            disabled={uploading || saving}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Upload
          </button>
          <button type="button" className="adm-si-btn" onClick={clearSlot} disabled={uploading || saving || !draft}>
            Clear
          </button>
          <button
            type="button"
            className="adm-si-btn adm-si-btn--save"
            onClick={save}
            disabled={uploading || saving || !dirty}
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>

        {error && <p className="adm-si-error">{error}</p>}
        {notice && <p className="adm-si-notice">{notice}</p>}
      </div>
    </div>
  );
};

const SiteImagesTab = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSlots = () => {
    adminApi
      .getSiteImages(getSessionToken())
      .then(setSlots)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const sections = SECTION_ORDER.map((name) => ({
    name,
    items: slots.filter((s) => (s.section || 'General') === name),
  })).filter((s) => s.items.length > 0);

  return (
    <div className="adm-tab-content">
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h2 className="adm-section-title">Site Images</h2>
          <p className="adm-section-sub">
            Replace page images without redeploying. Upload or paste a URL, then Save — an empty value
            falls back to the bundled default. Saved changes appear on the live site immediately.
          </p>
        </div>
        <button className="adm-export-btn" onClick={fetchSlots} disabled={loading}>
          Refresh
        </button>
      </div>

      {loading && (
        <div className="adm-loading">
          <span className="adm-spinner adm-spinner--lg" /> Loading site images…
        </div>
      )}
      {error && <p className="adm-error">Error: {error}</p>}

      {!loading && !error && sections.length === 0 && (
        <div className="adm-empty">No image slots yet.</div>
      )}

      {!loading && !error && sections.map((sec) => (
        <div key={sec.name} className="adm-si-section">
          <SectionHeader name={sec.name} count={sec.items.length} />
          <div className="adm-si-grid">
            {sec.items.map((slot) => (
              <SlotCard key={slot.slug} slot={slot} onSaved={(updated) => {
                setSlots((prev) => prev.map((s) => (s.slug === updated.slug ? { ...s, ...updated } : s)));
              }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SiteImagesTab;
