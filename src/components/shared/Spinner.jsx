import spinner from '../assets/loading-gif.gif'

function Spinner() {
  return (
    <img 
        src={spinner} alt="loading" 
        style={{width: '50px', margin: 'auto', display: 'block', marginTop: '50px'}}
      /> 
  )
}

export default Spinner