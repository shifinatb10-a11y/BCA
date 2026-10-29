import { PageIntro } from '../common/PageIntro'
import { Button } from '../common/Button'
import { Icon } from '../common/Icon'
import { asset } from '../../utils/storage'

export function Gallery({ galleryList, filter, setFilter, setViewer, canManageMedia, onOpenAddPhoto }) {
  const filtered = galleryList.filter((item) => {
    const isVideo = item.mediaType === 'video' || /\.(mp4|webm|mov|ogg|m4v)($|\?)/i.test(item.image || item.url || '')
    if (filter === 'All') return true
    if (filter === 'Videos') return isVideo
    return item.type === filter
  })

  return (
    <div className="page inner-page gallery-page">
      <PageIntro
        eyebrow="A living archive"
        title={<>Life in <em>frames & reels.</em></>}
        copy="The places, people, campus videos, and little in-between moments that make our department feel like ours."
      />
      <div className="gallery-toolbar">
        <div className="filter-tabs">
          {['All', 'Campus', 'Events', 'Identity', 'Videos'].map((item) => (
            <button className={filter === item ? 'filter-active' : ''} key={item} onClick={() => setFilter(item)}>
              {item === 'Videos' ? '📹 Videos' : item}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="muted-count">{filtered.length.toString().padStart(2, '0')} moments</span>
          {canManageMedia && (
            <Button onClick={onOpenAddPhoto} icon="plus" style={{ padding: '6px 14px', fontSize: '12px' }}>
              Add Photo / Video
            </Button>
          )}
        </div>
      </div>

      <div className="gallery-grid">
        {filtered.length > 0 ? (
          filtered.map((item, index) => {
            const isVideo = item.mediaType === 'video' || /\.(mp4|webm|mov|ogg|m4v)($|\?)/i.test(item.image || item.url || '')
            const mediaSrc = item.image && item.image.startsWith('http') ? item.image : asset(item.image)

            return (
              <button
                className={`gallery-item gallery-item-${(index % 6) + 1} ${isVideo ? 'gallery-item-video' : ''}`}
                key={item.id || `${item.title}-${index}`}
                onClick={() => setViewer({
                  title: item.title,
                  kind: `${item.type} ${isVideo ? 'Video' : 'Photo'}`,
                  mediaType: isVideo ? 'video' : 'image',
                  video: mediaSrc,
                  image: mediaSrc,
                  fileUrl: mediaSrc,
                })}
              >
                {isVideo ? (
                  <>
                    <div className="gallery-video-badge">
                      ▶ Video
                    </div>
                    <video
                      src={mediaSrc}
                      preload="metadata"
                      playsInline
                      muted
                      poster={item.thumbnail || ''}
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                    <div className="gallery-play-overlay">
                      <span style={{ marginLeft: '3px', fontSize: '18px' }}>▶</span>
                    </div>
                  </>
                ) : (
                  <img
                    src={mediaSrc}
                    alt={item.title}
                    onError={(e) => { e.currentTarget.src = asset('college-logo.png') }}
                  />
                )}
                <span className="gallery-overlay">
                  <small>{item.type} {isVideo && '· Video'}</small>
                  <strong>{item.title}</strong>
                  <i><Icon name="arrow" size={16} /></i>
                </span>
              </button>
            )
          })
        ) : (
          <div className="empty-state-card" style={{ padding: '40px 20px', textAlign: 'center', background: '#081220', border: '1px dashed #1e3a5f', borderRadius: '8px', color: '#94a3b8', gridColumn: '1 / -1' }}>
            <p style={{ margin: 0, fontSize: '14px' }}>No media found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
