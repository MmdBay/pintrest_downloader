interface VideoData {
    id: string;
    formats: Format[];
    duration: number;
    webpage_url: string;
    extractor_key: string;
    extractor: string;
    title: string;
    description: string;
    timestamp: number;
    thumbnails: Thumbnail[];
    uploader: string;
    uploader_id: string;
    repost_count: number;
    comment_count: number;
    categories: string[];
    tags: string[];
    original_url: string;
    webpage_url_basename: string;
    webpage_url_domain: string;
    playlist: null | string;
    playlist_index: null | number;
    thumbnail: string;
    display_id: string;
    fulltitle: string;
    duration_string: string;
    upload_date: string;
    release_year: null | number;
    requested_subtitles: null | string;
    _has_drm: null | boolean;
    epoch: number;
    requested_formats: Format[];
  }
  
  interface Format {
    format_id: string;
    format_index: null | number;
    url: string;
    manifest_url: string;
    tbr: number;
    ext: string;
    fps: number;
    protocol: string;
    preference: null | string;
    quality: null | string;
    has_drm: boolean;
    width: number;
    height: number;
    vcodec: string;
    acodec: string;
    dynamic_range: string;
    resolution: string;
    aspect_ratio: number;
    http_headers: object[];
    video_ext: string;
    audio_ext: string;
    vbr: number;
    abr: number;
    format: string;
  }
  
  interface Thumbnail {
    url: string;
    width: number;
    height: number;
    id: string;
    resolution: string;
  }