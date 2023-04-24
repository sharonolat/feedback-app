import { useEffect, useState, useContext } from "react"
import { FeedbackContext } from "../context/FeedbackContext"
import Card from "./shared/Card"
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button"

function FeedbackForm() {
  const {addFeedback, feedbackEdit, updateFeedback  } = useContext(FeedbackContext);
  const [rating, setRating] = useState(10);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [message , setMessage] = useState('');

  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setRating(+feedbackEdit.item.rating);
      document.getElementById('feedback-text').value = feedbackEdit.item.text ;
      setIsBtnDisabled(false);
    }
    
  }, [feedbackEdit])  
 

  const handleTextChange = (e) => {

    if(e.target.value === '') {
      setMessage(null);
      setIsBtnDisabled(true);
    }
    else if (e.target.value.trim() !== "" && e.target.value.trim().length <= 10 ) {
      setMessage('Please enter at least 10 characters')
      setIsBtnDisabled(true);
    }
    else if(e.target.value.trim().length > 10) {
      setMessage(null);
      setIsBtnDisabled(false);
    }
  }

  const  handleSubmit = (e) => {
    e.preventDefault();

    const formInput = e.target.children[2].children[0].value;

    const newFeedback = {
      rating,
      text: formInput 
    }


    feedbackEdit.edit === true ? updateFeedback(feedbackEdit.item.id, newFeedback) : addFeedback(newFeedback);

    e.target.children[2].children[0].value = '';
    setRating(10);

  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would rate your service with us?</h2>
        <RatingSelect select={setRating} selected={rating}/>
        <div className="input-group">
          <input
            id="feedback-text"
            type="text"
            placeholder="Write a review"
            onChange={(e) => {handleTextChange(e)}}
          />
          <Button
            type={"submit"}
            isDisabled={isBtnDisabled}
          >Submit</Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}
export default FeedbackForm