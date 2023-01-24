import './App.css';
import PhotoComponent from './components/PhotoComponent';
import {useEffect, useState} from 'react'

function App() {
  
  const [photos,setPhotos] = useState([])
  const [pages,setPages] = useState(0)
  const [isLoading,setIsLoading] = useState(false)

  const fetchPhoto = async()=>{
      
    const api_key = process.env.REACT_APP_API_KEY
    setIsLoading(true)
    try {
      const apiUrl = `https://api.unsplash.com/photos/?client_id=${api_key}&page=${pages}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      setPhotos((oldData)=>{
          return [...oldData,...data]        
      })
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  
  useEffect(()=>{
    fetchPhoto()
    // eslint-disable-next-line    
  },[pages])

  useEffect(()=>{
    const event = window.addEventListener('scroll',()=>{
      if(window.innerHeight + window.scrollY > document.body.offsetHeight-200 && !isLoading){
        setPages((oldpage)=>oldpage+1)
      }
    })
    return ()=>window.removeEventListener('scroll',event)
  },[isLoading])

  return (
    <main>
      <h1>Photo Scrolling App | Unsplash API</h1>
      <section className='photos'>
        <div className='display-photos'>
          {photos.map((data,index)=>
            <PhotoComponent key={index} {...data}/>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
