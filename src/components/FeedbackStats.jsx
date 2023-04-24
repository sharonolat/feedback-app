import { useContext } from 'react';
import { FeedbackContext } from '../context/FeedbackContext';

function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext);
  // Calculate average rating
  const calcAverage = (list) => {
    if(!list || list.length === 0) return 0;
    const sum = list.reduce((total, item) => {
      return total + item.rating;
    }, 0)
    return (sum / list.length).toFixed(1).replace(/[.,]0$/, '');
  }
  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} {feedback.length <= 1 ? "Review" : "Reviews"}</h4>
      <h4>Average Rating: {calcAverage(feedback)}</h4>
    </div>
  )
}


export default FeedbackStats