function RatingSelect({selected, select}) {
  const handleChange = (e) => {
    select(+e.currentTarget.value)
  }
  return (
    <ul className="rating">
      {[...Array(10)].map((_, i) =>(
        <li key={i}>
          <input 
            type="radio" 
            name="rating" 
            id={`num${i+1}`} 
            value={i+1}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  )
}

export default RatingSelect