import axios from 'axios';
import React,{useState,useEffect} from 'react'
import cold from '../assests/cold.jpg'
import hot from '../assests/hot.jpg'

const WeatherApp = () => {
const [city, setCity] = useState("Karachi");
const [weatherData, setWeatherData] = useState("");
const [error, setError] = useState(false);
const [callApi, setCallApi] = useState(false);
 let [day, setDay] = useState("");
 let [timeString, setTimeString] = useState("");
 let [cityName, setCityName] = useState("");

    

useEffect(()=>{
    let d = new Date();
    setDay(d.getDay());
    setTimeString(d.toLocaleTimeString('en-US'));
    
   
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city ? city : "karachi"}&units=metric&appid=70eefff73d1dfcf0e9ca4bfb45c3c9d2`)
    .then(
       res=>{
          setWeatherData(res.data.main);
          setCityName(res.data.name)
          setError(false)
          setCity('')
       }
       )
    .catch(
       err=>{
           console.log(err)
           setError(true)
       })

},[callApi])

const handleSubmit = (e)=>{
     e.preventDefault();
     console.log(city);
    
     
  
     if (!city) {
        alert("Please! Enter City");
        return;
      }
    
        setCallApi(!callApi);
        
}

console.log(weatherData);

  return (
    <>
    <div style={{  
  backgroundImage: "url("+`${weatherData.temp  <16 ? cold:hot}`+")",
  backgroundPosition: 'center',
  backgroundSize: '100% 100%' ,
  backgroundRepeat: 'no-repeat',
  backgroundAttachment:'fixed'
}}>
    <form className='inputBox' onSubmit={handleSubmit}>
    <input value={city} onChange={((e)=>setCity(e.target.value))} placeholder='Enter City...'/>
    </form>
    {error == false?(
        <>
       <article className="box weather">
        <div>
            <h1>{cityName}</h1>
        </div>
  <div className="icon bubble black">
    <div className="spin">
      <img src="https://dl.dropbox.com/s/0qq5anxliaopt8d/sun.png"/>
    </div>
  </div>
  {day == 0 ? day = <span className='day'>Sunday</span>:day == 1 ? day = <span className='day'>Monday</span>: day == 2 ? day = <span className='day'>Tuesday</span>:day == 3 ? day = <span className='day'>Wednesday</span>: day == 4 ? day = <span className='day'>Thursday</span>: day == 5 ? <span className='day'>Friday</span> : <span className='day'>Saturday</span>}
  <span className='timeString'>{timeString}</span>
  <span className="temp">{weatherData.temp}&deg;</span>
  <span className="high-low">min: {weatherData.temp_min}&deg;/ max: {weatherData.temp_max}&deg;</span>
  <span className="humidity">Humidity: {weatherData.humidity}</span>
  <span className="pressure">Pressure: {weatherData.pressure}</span>
  
  
</article>
        
        </>
        
    ): <div className='error'></div>}
    
    
    </div>
    </>
  )
}

export default WeatherApp