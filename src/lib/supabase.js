import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
const SUPABASE_URL = process.env.SUPABASE_URL || Constants.manifest?.extra?.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || Constants.manifest?.extra?.SUPABASE_ANON_KEY || '';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Upload file blob (uri from expo image picker) to Supabase Storage
 * Returns public URL or null on error.
 */
export async function uploadImage(uri, bucket='applications') {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `${Date.now()}-${Math.floor(Math.random()*1000)}.jpg`;
    const { data, error } = await supabase.storage.from(bucket).upload(filename, blob, { cacheControl: '3600', upsert: false });
    if (error) {
      console.error('Upload error', error);
      return null;
    }
    const { publicURL, error: urlError } = supabase.storage.from(bucket).getPublicUrl(filename);
    if (urlError) {
      console.error('Get public url error', urlError);
      return null;
    }
    return publicURL;
  } catch (err) {
    console.error('uploadImage exception', err);
    return null;
  }
}
