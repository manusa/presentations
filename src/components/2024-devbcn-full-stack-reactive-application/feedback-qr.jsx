import React from 'react';
import feedbackQr from '!raw-loader!./assets/feedback-qr.svg';

export const FeedbackQr = ({
  ...props
}) => (
  <div dangerouslySetInnerHTML={{__html: feedbackQr}} {...props} />
);
