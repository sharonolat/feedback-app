import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";


export const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  useEffect(() => {
    getFeedback();
  }, []);

  // Get feedback
  const getFeedback = async () => {
    const response = await fetch("/feedback");
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {

    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFeedback)
    })

    const data = await response.json();  
    setFeedback([data, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if(window.confirm("Are you sure you want to delete this feedback?")){
      const newFeedback = feedback.filter((feedback) => feedback.id !== id)

      await fetch(`/feedback/${id}`, {
        method: "DELETE"
        })

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
  const updateFeedback = async (id, updatedFeedback) => {

    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedFeedback)
    })
    
    const data = await response.json();
    
    const newFeedback = feedback.map((feedback) => feedback.id === id ? data : feedback)

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
          isLoading,
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