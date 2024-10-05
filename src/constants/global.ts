import type { Lang } from "@/interfaces";

export const SUPPORTED_IMAGE_TYPE = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/bmp",
];

export const SUPPORTED_VIDEO_TYPE = [
  "video/mp4",
  "video/avi",
  "video/mpeg",
  "video/quicktime",
];

export const SUPPORTED_DOCUMENT_TYPE = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export const SUPPORTED_AUDIO_TYPE = [
  "audio/mpeg",
  "audio/mp3",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "udio/aac",
  "audio/flac",
  "audio/midi",
];

export const SUPPORTED_IMAGE_EXT = [".png", ".jpg", ".jpeg", ".gif", ".bmp"];

export const SUPPORTED_VIDEO_EXT = [".mp4", ".avi", ".mpeg", ".qt", ".mov"];

export const SUPPORTED_DOCUMENT_EXT = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
];

export const SUPPORTED_AUDIO_EXT = [
  ".mp3",
  ".mp4",
  ".mpeg",
  ".wav",
  ".ogg",
  ".aac",
  ".flac",
  ".midi",
];

export const LANGS: Lang[] = ["en", "id"];
