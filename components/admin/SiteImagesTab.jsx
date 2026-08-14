import React, { useState, useEffect, useRef } from 'react';
import { adminApi } from '../../lib/admin';
import { getSessionToken } from '../../lib/security';
import { uploadImage } from '../../lib/cloudinary';
import { refreshSiteImages } from '../../lib/siteImages';
import { defaultSiteImage } from '../../lib/defaultImages';

const SECTION_ORDER = ['Hero / Background', 'Events', 'Team', 'Partners', 'General'];
const SLUG_RE = /^[a-z0-9_]{1,64}$/;

const IconUpload = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
const IconEdit = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const IconTrash = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;

const SectionHeader = ({ name, count }) => (
  <div className="adm-si-section-hd">
    <h3 className="adm-si-section-title">{name}</h3>
    <span className="adm-si-section-count">{count}</span>
  </div>
);

const SlotCard = ({ slot, onSaved, onEdit, onDelete }) => {
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
      const res = await adminApi.updateSiteImage(getSessionToken(), slot.slug, { imageUrl: draft });
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
        <div className="adm-si-card-actions">
          <button type="button" className="adm-si-icon-btn" onClick={onEdit} title="Edit label/section"><IconEdit /></button>
          <button type="button" className="adm-si-icon-btn adm-si-icon-btn--danger" onClick={onDelete} title="Delete slot"><IconTrash /></button>
        </div>
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
            <IconUpload />
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

const SlotFormModal = ({ mode, initial, submitting, onClose, onSubmit }) => {
  const isCreate = mode === 'create';
  const [slug, setSlug] = useState(initial.slug || '');
  const [label, setLabel] = useState(initial.label || '');
  const [section, setSection] = useState(initial.section || 'General');
  const [imageUrl, setImageUrl] = useState(initial.imageUrl || '');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slugError, setSlugError] = useState('');
  const fileRef = useRef(null);

  const canSubmit =
    !uploading &&
    !submitting &&
    label.trim().length > 0 &&
    (isCreate ? SLUG_RE.test(slug.trim()) : true);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    try {
      const url = await uploadImage(file, {
        folder: 'ttgai-site-images',
        context: `slot=${slug.trim() || 'new'}|label=${label.trim()}`,
        onProgress: setProgress,
      });
      setImageUrl(url);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (isCreate && !SLUG_RE.test(slug.trim())) {
      setSlugError('Use only lowercase letters, numbers, and underscores.');
      return;
    }
    onSubmit({ slug: slug.trim(), label: label.trim(), section, imageUrl });
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal adm-edit-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{isCreate ? 'Add Image Slot' : 'Edit Image Slot'}</h2>
        <form className="adm-edit-form" onSubmit={submit}>
          {isCreate && (
            <div className="adm-edit-group">
              <label className="adm-edit-label">Slug</label>
              <input
                className="adm-edit-input"
                required
                type="text"
                placeholder="e.g. home_spot_4"
                value={slug}
                onChange={(e) => { setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_')); setSlugError(''); }}
              />
              {slugError && <p className="adm-si-error">{slugError}</p>}
              <p className="adm-si-hint">Lowercase letters, numbers, underscores. The public page must be coded to use this slug.</p>
            </div>
          )}
          <div className="adm-edit-group">
            <label className="adm-edit-label">Label</label>
            <input className="adm-edit-input" required type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Home — Inside Team Twilight" />
          </div>
          <div className="adm-edit-group">
            <label className="adm-edit-label">Section</label>
            <select className="adm-edit-select" value={section} onChange={(e) => setSection(e.target.value)}>
              {SECTION_ORDER.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="adm-edit-group">
            <label className="adm-edit-label">Image</label>
            <div className="adm-edit-image-row">
              <input className="adm-edit-input" type="url" placeholder="Paste image URL…" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,application/pdf" style={{ display: 'none' }} onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ''; }} />
              <button type="button" className="adm-edit-upload-btn" onClick={() => fileRef.current?.click()} disabled={uploading}>
                {uploading ? `${progress}%` : 'Upload'}
              </button>
            </div>
            {imageUrl && (
              <div className="adm-edit-image-preview">
                <img src={imageUrl} alt="Preview" />
              </div>
            )}
          </div>
          <div className="adm-modal-actions">
            <button type="button" className="adm-modal-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="adm-modal-confirm" disabled={!canSubmit}>
              {submitting ? 'Saving…' : isCreate ? 'Add Slot' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({ slot, deleting, onConfirm, onCancel }) => (
  <div className="adm-modal-overlay" onClick={onCancel}>
    <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
      <h2 style={{ color: '#dc2626' }}>Delete Image Slot?</h2>
      <p style={{ margin: '0.5rem 0' }}>
        Are you sure you want to delete <br /><strong>"{slot.label}"</strong> ({slot.slug})?
      </p>
      <p className="adm-si-hint">The public page will automatically fall back to its bundled default image.</p>
      <div className="adm-modal-actions" style={{ marginTop: '0' }}>
        <button className="adm-modal-cancel" onClick={onCancel}>Cancel</button>
        <button className="adm-modal-confirm" style={{ background: '#dc2626' }} onClick={onConfirm} disabled={deleting}>
          {deleting ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </div>
  </div>
);

const SiteImagesTab = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null); // { type: 'create'|'edit'|'delete', slot? }
  const [submitting, setSubmitting] = useState(false);

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

  const upsertSlot = (updated) => {
    setSlots((prev) => {
      const exists = prev.some((s) => s.slug === updated.slug);
      return exists
        ? prev.map((s) => (s.slug === updated.slug ? { ...s, ...updated } : s))
        : [...prev, updated];
    });
  };

  const submitCreate = async ({ slug, label, section, imageUrl }) => {
    setSubmitting(true);
    try {
      const res = await adminApi.createSiteImage(getSessionToken(), { slug, label, section, imageUrl });
      await refreshSiteImages();
      upsertSlot(res);
      setModal(null);
    } catch (err) {
      console.error('Create failed:', err);
      alert(err.code === 'duplicate_slug' ? 'A slot with that slug already exists.' : 'Create failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const submitEdit = async ({ slug, label, section, imageUrl }) => {
    setSubmitting(true);
    try {
      const res = await adminApi.updateSiteImage(getSessionToken(), slug, { label, section, imageUrl });
      await refreshSiteImages();
      upsertSlot(res);
      setModal(null);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const submitDelete = async () => {
    const { slot } = modal;
    setSubmitting(true);
    try {
      await adminApi.deleteSiteImage(getSessionToken(), slot.slug);
      await refreshSiteImages();
      setSlots((prev) => prev.filter((s) => s.slug !== slot.slug));
      setModal(null);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
        <div className="adm-page-header-actions">
          <button className="adm-create-btn" onClick={() => setModal({ type: 'create', slot: null })}>
            + ADD SLOT
          </button>
          <button className="adm-export-btn" onClick={fetchSlots} disabled={loading}>
            Refresh
          </button>
        </div>
      </div>

      {loading && (
        <div className="adm-loading">
          <span className="adm-spinner adm-spinner--lg" /> Loading site images…
        </div>
      )}
      {error && <p className="adm-error">Error: {error}</p>}

      {!loading && !error && sections.length === 0 && (
        <div className="adm-empty">No image slots yet. Add one with "+ Add Slot".</div>
      )}

      {!loading && !error && sections.map((sec) => (
        <div key={sec.name} className="adm-si-section">
          <SectionHeader name={sec.name} count={sec.items.length} />
          <div className="adm-si-grid">
            {sec.items.map((slot) => (
              <SlotCard
                key={slot.slug}
                slot={slot}
                onSaved={upsertSlot}
                onEdit={() => setModal({
                  type: 'edit',
                  slot,
                  initial: { slug: slot.slug, label: slot.label, section: slot.section, imageUrl: slot.image_url },
                })}
                onDelete={() => setModal({ type: 'delete', slot })}
              />
            ))}
          </div>
        </div>
      ))}

      {(modal?.type === 'create' || modal?.type === 'edit') && (
        <SlotFormModal
          mode={modal.type}
          initial={modal.initial || { slug: '', label: '', section: 'General', imageUrl: '' }}
          submitting={submitting}
          onClose={() => setModal(null)}
          onSubmit={modal.type === 'create' ? submitCreate : submitEdit}
        />
      )}

      {modal?.type === 'delete' && (
        <DeleteConfirmModal
          slot={modal.slot}
          deleting={submitting}
          onConfirm={submitDelete}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default SiteImagesTab;
