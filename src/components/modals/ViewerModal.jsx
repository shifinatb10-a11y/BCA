import { Icon } from '../common/Icon'
import { Button } from '../common/Button'

export function ViewerModal({ item, onClose }) {
  if (!item) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="viewer-modal" onClick={(event) => event.stopPropagation()}>
        {item.image && <img src={item.image} alt={item.title} />}
        <div className="viewer-copy">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />{item.kind}</span>
            <h2>{item.title}</h2>
            <p>{item.date || 'PSMO College · BCA Department'}</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close modal"><Icon name="close" /></button>
        </div>
        {!item.image && (
          <div className="pdf-preview">
            <Icon name="book" size={35} />
            <strong>Secure document preview</strong>
            <span>This demo viewer is ready for PDF reports and question papers.</span>
            <Button variant="outline" onClick={onClose}>Close preview</Button>
          </div>
        )}
      </div>
    </div>
  )
}
