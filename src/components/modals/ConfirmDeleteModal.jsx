import { Icon } from '../common/Icon'

export function ConfirmDeleteModal({ dialog, onClose }) {
  if (!dialog) return null

  return (
    <div
      className="modal-backdrop confirm-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="confirm-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-warning-icon">
          <Icon name="alert" size={30} />
        </div>

        <div className="confirm-kicker">Warning · Confirmation Required</div>
        <h3 id="confirm-modal-title">{dialog.title || 'Confirm Deletion'}</h3>

        <div className="confirm-item-preview">
          <div className="confirm-preview-top">
            <span className="confirm-type-tag">{dialog.itemType || 'Record'}</span>
            <span className="confirm-destructive-tag">Permanent</span>
          </div>
          <strong className="confirm-item-name">{dialog.itemName}</strong>
          <div className="confirm-irreversible-notice">
            <Icon name="alert" size={14} />
            <span>{dialog.warning || 'This item will be permanently deleted from the portal database and cannot be recovered.'}</span>
          </div>
        </div>

        <div className="confirm-actions">
          <button type="button" className="confirm-btn-cancel" onClick={onClose}>
            Cancel & Keep
          </button>
          <button type="button" className="confirm-btn-delete" onClick={dialog.onConfirm}>
            <Icon name="trash" size={15} />
            {dialog.confirmText || 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
