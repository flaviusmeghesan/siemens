
import './App.css';
import { useEffect, useState } from 'react';
import api from './api/axiosConfig.js';
import Hotel from './Components/Hotel.js';

function App() {
  const [hotels, setHotels] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [range, setRange] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null && range !== '') {
      fetchHotels();
    }
  }, [latitude, longitude, range]);

  const fetchHotels = async () => {
    console.log(range, latitude, longitude);
    const res = await api.get(`/api/v1/hotels/range?range=${range}&userLat=${latitude}&userLon=${longitude}`);
    setHotels(res.data);
    console.log(hotels);
  }

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  }

  return (
    <div className="flex flex-col items-center gap-2 text-center mx-auto">
      <div className='flex gap-2 my-2'>
      <h1 className=''>Radius</h1>
      <input className='rounded-lg border-2 ' id='range' value={range} onChange={handleRangeChange} />
      </div>
      <div>
      <button onClick={fetchHotels} className='rounded-md border-2 w-[100px] bg-slate-700 text-white'>Find hotels</button>
      { hotels && hotels.map((hotel)=>(
        <Hotel key={hotel._id} hotel={hotel}/>
      ))}
      </div>
    </div>
  );
}

export default App;
