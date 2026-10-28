import { Icon } from '../common/Icon'
import { Button } from '../common/Button'

export function QuizModal({
  questions = [],
  score,
  answers,
  setAnswers,
  submitted,
  setSubmitted,
  onClose,
  subjectCode,
  semester,
}) {
  if (questions.length === 0) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div>
              <span className="eyebrow"><span className="eyebrow-line" />{subjectCode} · {semester} Practice Test</span>
              <h2>No Questions Available</h2>
            </div>
            <button className="icon-button" onClick={onClose} aria-label="Close quiz"><Icon name="close" /></button>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '20px 0' }}>There are currently no practice questions seeded for {subjectCode} ({semester}).</p>
          <Button onClick={onClose} icon="arrow">Back to study zone</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-backdrop">
      <div className="quiz-modal">
        <div className="modal-header">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />{subjectCode} · {semester} Test 01</span>
            <h2>Quick check.</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close quiz"><Icon name="close" /></button>
        </div>

        {submitted ? (
          <div className="quiz-result">
            <div className="result-orb">{score === questions.length ? '✦' : score}</div>
            <span className="eyebrow">Your result</span>
            <h3>{score === questions.length ? 'You nailed it.' : `${score} of ${questions.length} correct`}</h3>
            <p>{score === questions.length ? 'Perfect score. Keep that momentum going.' : 'Good start. Review the paper and try again when you’re ready.'}</p>
            <Button onClick={onClose} icon="arrow">Back to study zone</Button>
          </div>
        ) : (
          <>
            <div className="quiz-progress">
              <span>Question {Object.keys(answers).length + 1} of {questions.length}</span>
              <div><i style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }} /></div>
            </div>
            <div className="quiz-questions">
              {questions.map((question, index) => (
                <div className="quiz-question" key={question.id || question.text}>
                  <h3><span>0{index + 1}</span>{question.text}</h3>
                  <div className="answer-grid">
                    {question.options.map((option) => (
                      <button
                        key={option}
                        className={answers[index] === option ? 'answer-selected' : ''}
                        onClick={() => setAnswers({ ...answers, [index]: option })}
                      >
                        <span>{String.fromCharCode(65 + question.options.indexOf(option))}</span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="quiz-submit"
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length < questions.length}
            >
              Submit answers <Icon name="arrow" size={16} />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
