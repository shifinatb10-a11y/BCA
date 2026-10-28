import { useState, useRef } from 'react'
import { Icon } from './Icon'
import { uploadToImageKit, isImageKitConfigured } from '../../utils/imagekit'

export function ImageKitUploader({
  value = '',
  onChange,
  folder = '/bca_portal',
  accept = 'image/*',
  label = 'Upload media file to ImageKit',
  placeholder = 'https://ik.imagekit.io/... or paste URL',
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  const [showManualUrl, setShowManualUrl] = useState(false)
  const fileInputRef = useRef(null)

  const isConfigured = isImageKitConfigured()
  const isImage = value && (value.match(/\.(jpeg|jpg|gif|png|webp|svg)($|\?)/i) || value.includes('/tr:') || !value.includes('.pdf'))
  const isPdf = value && value.toLowerCase().includes('.pdf')

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')
    setUploadProgress(20)

    try {
      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => (prev < 90 ? prev + 15 : prev))
      }, 200)

      const result = await uploadToImageKit(file, {
        folder,
        fileName: file.name,
      })

      clearInterval(progressTimer)
      setUploadProgress(100)

      if (result && result.url) {
        onChange(result.url)
      }
    } catch (err) {
      setError(err.message || 'Upload to ImageKit failed.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleClear = () => {
    onChange('')
    setError('')
  }

  return (
    <div className="imagekit-uploader-root" style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <label style={{ margin: 0, fontSize: '11.5px', fontWeight: 600, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Icon name="spark" size={13} /> {label}
          <span style={{ fontSize: '10px', color: '#06b6d4', background: 'rgba(6,182,212,0.12)', padding: '1px 6px', borderRadius: '4px', border: '1px solid rgba(6,182,212,0.3)' }}>
            ⚡ ImageKit CDN
          </span>
        </label>
        <button
          type="button"
          onClick={() => setShowManualUrl(!showManualUrl)}
          style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {showManualUrl ? 'Switch to file picker' : 'Paste URL directly'}
        </button>
      </div>

      {/* Manual URL input fallback */}
      {showManualUrl ? (
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ flex: 1 }}
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '0 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Clear
            </button>
          )}
        </div>
      ) : (
        <div>
          {/* Upload Drop/Button Area */}
          <div
            onClick={() => !uploading && fileInputRef.current?.click()}
            style={{
              border: '1.5px dashed #1e3a5f',
              borderRadius: '8px',
              padding: '12px 14px',
              background: '#090f1f',
              cursor: uploading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept={accept}
              style={{ display: 'none' }}
              disabled={uploading}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  background: 'rgba(6,182,212,0.12)',
                  border: '1px solid #06b6d4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8',
                }}
              >
                {uploading ? <Icon name="spark" size={18} /> : <Icon name="paper" size={18} />}
              </div>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#f1f5f9' }}>
                  {uploading ? 'Uploading to ImageKit CDN...' : value ? 'Click to replace file' : 'Click to upload from device'}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  {uploading ? `Transferring... ${uploadProgress}%` : `Accepts ${accept} · Auto-hosted on ImageKit`}
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: '11.5px',
                padding: '4px 10px',
                borderRadius: '4px',
                background: 'rgba(6,182,212,0.15)',
                color: '#38bdf8',
                border: '1px solid rgba(6,182,212,0.3)',
                fontWeight: 600,
              }}
            >
              {uploading ? 'Processing' : 'Browse'}
            </div>
          </div>

          {/* Active Upload Preview */}
          {value && !uploading && (
            <div
              style={{
                marginTop: '8px',
                padding: '8px 12px',
                background: '#0c1527',
                border: '1px solid #1e3a5f',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                {isImage && (
                  <img
                    src={value}
                    alt="Uploaded preview"
                    style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #06b6d4' }}
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                )}
                {isPdf && (
                  <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171' }}>
                    <Icon name="book" size={16} />
                  </div>
                )}
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Icon name="check" size={12} /> ImageKit File Active
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '320px' }}>
                    {value}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '11px', color: '#38bdf8', textDecoration: 'none', padding: '3px 8px', background: 'rgba(6,182,212,0.1)', borderRadius: '4px', border: '1px solid rgba(6,182,212,0.2)' }}
                >
                  View
                </a>
                <button
                  type="button"
                  onClick={handleClear}
                  style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', fontSize: '11px' }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div style={{ marginTop: '6px', fontSize: '11px', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="close" size={12} /> {error}
        </div>
      )}
    </div>
  )
}
