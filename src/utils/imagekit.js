/**
 * ImageKit Media Storage & CDN Utility for PSMO BCA Portal
 * Supports instant uploads of Images, PDF documents, Reports, Question Papers, and Media
 */

const getEnv = (key, fallback = '') => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || fallback
  }
  return fallback
}

export const IMAGEKIT_PUBLIC_KEY =
  getEnv('VITE_IMAGEKIT_PUBLIC_KEY') ||
  getEnv('IMAGEKIT_PUBLIC_KEY') ||
  'public_xKz3rga99Yrx4MiVGpPn4JCJah4='

export const IMAGEKIT_PRIVATE_KEY =
  getEnv('VITE_IMAGEKIT_PRIVATE_KEY') ||
  getEnv('IMAGEKIT_PRIVATE_KEY') ||
  'private_Jm6NnGIqkZ5CWFIufkX9F2rwPAY='

export const IMAGEKIT_URL_ENDPOINT =
  getEnv('VITE_IMAGEKIT_URL_ENDPOINT') ||
  getEnv('IMAGEKIT_URL_ENDPOINT') ||
  getEnv('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT') ||
  'https://ik.imagekit.io/qys054an8'

/**
 * Returns true if ImageKit credentials are configured
 */
export const isImageKitConfigured = () => {
  return Boolean(IMAGEKIT_URL_ENDPOINT && (IMAGEKIT_PRIVATE_KEY || IMAGEKIT_PUBLIC_KEY))
}

/**
 * Upload a File object, Blob, or base64 data string to ImageKit
 * @param {File|Blob|string} file - The file to upload
 * @param {Object} [options]
 * @param {string} [options.folder] - Target folder in ImageKit (e.g. '/bca_portal/documents')
 * @param {string} [options.fileName] - Custom filename
 * @param {string} [options.tags] - Comma separated tags
 * @param {Function} [options.onProgress] - Optional progress callback
 */
export const uploadToImageKit = async (file, options = {}) => {
  if (!isImageKitConfigured()) {
    throw new Error('ImageKit credentials are not configured. Check your environment settings.')
  }

  const folder = options.folder || '/bca_portal'
  const customName = options.fileName || (file && file.name ? file.name : `bca_${Date.now()}`)
  // Sanitize filename for safe URL encoding
  const sanitizedName = customName.replace(/[^a-zA-Z0-9._-]/g, '_')

  const formData = new FormData()
  formData.append('file', file)
  formData.append('fileName', sanitizedName)
  formData.append('folder', folder)
  formData.append('useUniqueFileName', 'true')
  if (options.tags) {
    formData.append('tags', options.tags)
  }

  // Basic Auth with ImageKit private key for direct, high-speed authenticated uploads
  const authHeader = 'Basic ' + btoa(`${IMAGEKIT_PRIVATE_KEY}:`)

  const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
    method: 'POST',
    headers: {
      Authorization: authHeader,
    },
    body: formData,
  })

  if (!response.ok) {
    let errorMsg = `Upload failed with status ${response.status}`
    try {
      const errData = await response.json()
      if (errData.message) errorMsg = errData.message
    } catch (e) {}
    throw new Error(errorMsg)
  }

  const data = await response.json()
  return {
    success: true,
    fileId: data.fileId,
    name: data.name,
    url: data.url,
    thumbnailUrl: data.thumbnailUrl || data.url,
    filePath: data.filePath,
    size: data.size,
    fileType: data.fileType,
  }
}

/**
 * Generate an optimized ImageKit URL with transformations
 */
export const getImageKitUrl = (urlOrPath, transforms = '') => {
  if (!urlOrPath) return ''
  if (!transforms) return urlOrPath
  if (urlOrPath.includes(IMAGEKIT_URL_ENDPOINT)) {
    return urlOrPath.replace(IMAGEKIT_URL_ENDPOINT, `${IMAGEKIT_URL_ENDPOINT}/tr:${transforms}`)
  }
  return urlOrPath
}
