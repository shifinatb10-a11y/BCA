import { Icon } from '../common/Icon'
import { Button } from '../common/Button'

export function ViewerModal({ item, onClose }) {
  if (!item) return null

  const fileUrl = item.fileUrl || item.video || item.url || (item.image && item.image.startsWith('http') ? item.image : '')
  const isPdf = fileUrl && fileUrl.toLowerCase().includes('.pdf')
  const isVideo = item.mediaType === 'video' || (fileUrl && /\.(mp4|webm|mov|ogg|m4v)($|\?)/i.test(fileUrl))

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="viewer-modal" onClick={(event) => event.stopPropagation()} style={{ maxWidth: isPdf || isVideo ? '760px' : '560px' }}>
        {item.image && !isPdf && !isVideo && <img src={item.image} alt={item.title} />}

        {isVideo && (
          <div style={{ width: '100%', maxHeight: '480px', background: '#000', borderBottom: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <video
              src={fileUrl}
              controls
              autoPlay
              playsInline
              style={{ width: '100%', maxHeight: '480px', objectFit: 'contain' }}
            />
          </div>
        )}

        {isPdf && (
          <div style={{ width: '100%', height: '420px', background: '#090f1f', borderBottom: '1px solid #1e3a5f' }}>
            <iframe
              src={fileUrl}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title={item.title || 'Document Preview'}
            />
          </div>
        )}

        <div className="viewer-copy">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />{item.kind || (isVideo ? 'Campus Video' : 'Document')}</span>
            <h2>{item.title}</h2>
            <p>{item.date || 'PSMO College · BCA Department'}</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close modal"><Icon name="close" /></button>
        </div>

        {fileUrl && (
          <div style={{ padding: '0 24px 20px', display: 'flex', gap: '10px' }}>
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                flex: 1,
                padding: '10px 16px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Icon name="external" size={15} /> {isVideo ? 'Open Video in Full Tab' : isPdf ? 'Open Document in Full View' : 'Open Media in Full Tab'}
            </a>
            <Button variant="outline" onClick={onClose}>Close preview</Button>
          </div>
        )}

        {!item.image && !fileUrl && (
          <div className="pdf-preview">
            <Icon name="book" size={35} />
            <strong>Document Preview</strong>
            <span>No document attachment linked yet. Upload one via Admin Studio.</span>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        )}
      </div>
    </div>
  )
}
