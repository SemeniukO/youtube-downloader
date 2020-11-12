import React from 'react';
import { Link } from "react-router-dom";

const Input = (props) => {

   const handleClick = () => {
      props.updateData({
         classNone: false,
         loader: true,
         errLoad: false,
      })
      sendURL(props.url);
   }

   const sendURL = (URL) => {
      fetch(`http://localhost:3000/download?URL=${URL}`)
         .then(res => res.json())
         .then(data => {
            console.log(data)
            if (data.error) {
               return (
                  props.updateData({
                     classNone: false,
                     loader: false,
                     errLoad: true,
                  })
               )
            }
            if (data.time === '0') {
               return (
                  props.updateData({
                     classNone: false,
                     loader: false,
                     errLoad: true,
                  })
               )
            }
            props.updateData({
               info: data,
               video: data.video,
               classNone: true,
               loader: false
            });
         })
   }

   return (
      <div className="app__wraper">
         <h1 className="hero-header">Download Video from YouTube</h1>
         <div className='app__downloader'>
            <div className="app__top">
               <div className='app__url'>
                  <input
                     type="text"
                     placeholder="Paste link here..."
                     value={props.url}
                     onClick={(event) => event.target.select()}
                     onChange={(event) => props.updateData({ url: event.target.value })}
                  />
                  <div className="app__clear" >
                     <button onClick={(event) => props.updateData({ url: '' })}>&times;</button>
                  </div>
               </div>
               <button className='button' onClick={handleClick}>Click</button>
            </div>
            <div className='app__term'>
               <div>By using our service you are accepting our <Link to='/terms-of-service'>Terms of Service</Link></div>
            </div>
            {props.errLoad ? <div className='y__download'> Sorry, we have some error with your link</div> : null}
            {props.loader ? <div className='loader__block'><div className="loader"></div></div> : null}
         </div>
      </div>
   )

}
export default Input;