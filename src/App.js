import { FeedbackProvider } from "./context/FeedbackContext";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header"
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./FeedbackList";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import Posts from "./components/Posts";


function App(){
  
  return (
    <FeedbackProvider>
      <Router>
      <Header/>
      <div className="container">
        <Routes>
          <Route path="/"
            element={
              <>
                <FeedbackForm/>
                <FeedbackStats/>
                <FeedbackList/>
              </>
            }
            />
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/posts/*" element={<Posts />} />
        </Routes>
      </div>
      <AboutIconLink/>
    </ Router>
    </FeedbackProvider>
    
  )
}

export default App;  