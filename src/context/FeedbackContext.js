import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FeedbackData from "../data/Feedbackdata.js";


export const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });


  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = (id) => {
    if(window.confirm("Are you sure you want to delete this feedback?")){
      const newFeedback = feedback.filter((feedback) => feedback.id !== id)
      setFeedback(newFeedback)
    }
  }

  // Edit feedback
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  // Update feedback
  const updateFeedback = (id, updatedFeedback) => {
    updatedFeedback.id = id;
    
    const newFeedback = feedback.map((feedback) => feedback.id === id ? updatedFeedback : feedback)
    setFeedback(newFeedback)
    setFeedbackEdit({
      item: {},
      edit: false
    })
  }

  return (
    <FeedbackContext.Provider 
      value={
        {
          feedback,
          feedbackEdit,
          addFeedback,
          deleteFeedback,
          editFeedback,
          updateFeedback
        } 
      }
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackProvider;