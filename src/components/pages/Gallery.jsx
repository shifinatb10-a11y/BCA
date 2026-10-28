import { PageIntro } from '../common/PageIntro'
import { Button } from '../common/Button'
import { Icon } from '../common/Icon'
import { asset } from '../../utils/storage'

export function Gallery({ galleryList, filter, setFilter, setViewer, canManageMedia, onOpenAddPhoto }) {
  const filtered = filter === 'All' ? galleryList : galleryList.filter((item) => item.type === filter)

  return (
    <div className="page inner-page gallery-page">
      <PageIntro
        eyebrow="A living archive"
        title={<>Life in <em>frames.</em></>}
        copy="The places, people and little in-between moments that make our department feel like ours."
      />
      <div className="gallery-toolbar">
        <div className="filter-tabs">
          {['All', 'Campus', 'Events', 'Identity'].map((item) => (
            <button className={filter === item ? 'filter-active' : ''} key={item} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="muted-count">{filtered.length.toString().padStart(2, '0')} moments</span>
          {canManageMedia && (
            <Button onClick={onOpenAddPhoto} icon="plus" style={{ padding: '6px 12px', fontSize: '12px' }}>
              Add Photo
            </Button>
          )}
        </div>
      </div>

      <div className="gallery-grid">
        {filtered.map((item, index) => (
          <button
            className={`gallery-item gallery-item-${(index % 6) + 1}`}
            key={item.id || `${item.title}-${index}`}
            onClick={() => setViewer({ title: item.title, kind: item.type, image: item.image.startsWith('http') ? item.image : asset(item.image) })}
          >
            <img src={item.image.startsWith('http') ? item.image : asset(item.image)} alt={item.title} />
            <span className="gallery-overlay">
              <small>{item.type}</small>
              <strong>{item.title}</strong>
              <i><Icon name="arrow" size={16} /></i>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
