import { useState, useEffect } from 'react';
import { supabase } from './supabase';

/**
 * Site images (admin-editable image slots) — public read via the anon key.
 *
 * Each page asks for the slug it cares about and falls back to its bundled
 * asset when the slot is empty. The result is cached in a module-level map so
 * every page shares ONE fetch and there is no refetch on route changes.
 */

let cache = null;
let inflight = null;

function fetchSiteImages() {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;

  inflight = supabase
    .from('site_images')
    .select('slug, image_url')
    .then(({ data }) => {
      const map = {};
      (data || []).forEach((row) => {
        map[row.slug] = row.image_url || '';
      });
      cache = map;
      return map;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

/** Re-fetch site images (used by the admin page after an update). */
export function refreshSiteImages() {
  cache = null;
  return fetchSiteImages();
}

/** Deterministic slug used to match a Team member name to its image slot. */
export function siteImageSlug(name) {
  return String(name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * React hook returning the site image map ({ slug: imageUrl }).
 * Empty imageUrl means the page should use its bundled fallback.
 */
export function useSiteImages() {
  const [images, setImages] = useState({});

  useEffect(() => {
    let mounted = true;
    fetchSiteImages()
      .then((map) => {
        if (mounted) setImages(map);
      })
      .catch(() => {
        // Fall back to bundled assets silently.
      });
    return () => {
      mounted = false;
    };
  }, []);

  return images;
}
