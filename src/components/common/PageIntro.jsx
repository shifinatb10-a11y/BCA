export function PageIntro({ eyebrow, title, copy, children }) {
  return (
    <div className="page-intro">
      <div className="eyebrow light"><span className="eyebrow-line" />{eyebrow}</div>
      <div className="page-title-row">
        <h1>{title}</h1>
        {children}
      </div>
      {copy && <p className="page-copy">{copy}</p>}
    </div>
  )
}
