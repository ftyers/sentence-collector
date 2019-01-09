import React from 'react';

import ReviewLink from './review-link';

export default class ConfirmForm extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.props.onSubmit.bind(this);
    this.onReview = this.props.onReview.bind(this);
    this.onCancel = this.props.onCancel.bind(this);
  }

  render() {
    const {
      submitted,
      existing,
      invalidated,
      filtered,
      validated,
      unreviewed,
      readyCount,
    } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <h2>Confirm New Sentences</h2>
        <p>
          {`${submitted.length} sentences found.`}
        </p>

        {(existing && existing.length > 0) && (
          <p>
            {`${existing.length} sentences were previously submitted.`}
          </p>
        )}

        {invalidated.length + filtered.length > 0 && (
          <p style={{color: 'red'}}>
            {
              `${filtered.length} sentences were not matching the requirements.` +
              (invalidated.length > 0 ?
                ` (${invalidated.length} more rejected by you) ` : '')
            }
          </p>
        )}

        {validated.length + invalidated.length > 0 && (
          <p>
            {`-- ${validated.length + invalidated.length}`} {}
            sentences are already reviewed. Great job!
          </p>
        )}

        <p><b>{`${readyCount} sentences ready for submission!`}</b></p>

        {unreviewed.length > 0 && (
          <p>
            {`-- ${unreviewed.length} of these sentences are unreviewed. If you want, you can also review your sentences now before submitting them.`}&nbsp;
            <ReviewLink onReview={this.onReview}
                        sentences={unreviewed} />
          </p>
        )}

        <p>
          By submitting these sentences you grant a {}
          <a href="https://en.wikipedia.org/wiki/Public_domain" target="_blank">Public Domain License</a> {}
          for self-written sentences, or declare that sentences from a third-party are under Public Domain License
          and can be used.
        </p>
        <section id="confirm-buttons">
          <button type="submit" disabled={readyCount === 0}>Confirm</button>
          <button onClick={this.onCancel}>Cancel</button>
        </section>

        {invalidated.length + filtered.length > 0 && (
          <section>
            <h2>Filtered sentences due to requirements failing:</h2>
            <p>Please check the <a href="https://common-voice.github.io/sentence-collector/#/how-to">guidelines</a>.</p>

            {filtered.map(sentence => <p key={sentence}>{sentence}</p>)}
          </section>
        )}
      </form>
    );
  }
}