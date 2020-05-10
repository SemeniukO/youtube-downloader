import React from 'react';
import { Link } from "react-router-dom";

class Input extends React.Component {
   constructor(props) {
      super(props);
      this.textInput = React.createRef();
      this.handleClick = this.handleClick.bind(this);
      this.clearUrl = this.clearUrl.bind(this);
      this.state = {
      };
   }

   handleClick(e) {
      this.props.updateHide({
         classNone: 'y__none',
         loader: '',
         errLoad: 'y__none',
      })
      e.preventDefault();
      this.sendURL(this.textInput.value);
   }

   sendURL(URL) {
      fetch(`http://localhost:3000/download?URL=${URL}`)
         .then(res => res.json())
         .then(data => {
            console.log(data);
            if (data.error) {               
               return (
                  this.props.updateHide({
                     loader: 'y__none',
                     classNone: 'y__none',
                     errLoad: 'y__download',
                  })
               )
            }
            if (data.time === '0') {
               return (
                  this.props.updateData({
                     loader: 'y__none',
                     classNone: 'y__none',
                     errLoad: 'y__download',
                  })
               )
            }
            this.props.updateData({
               hits: data,
               video: data.video,
               classNone: 'zoomIn',
               loader: 'y__none'
            });
         })
   }

   clearUrl(e) {
      e.preventDefault();
      this.textInput.value = '';
   }

   selectText = (event) => event.target.select();

   render() {
      return (
         <div className="app__wraper">
            <h1 className="hero-header">Download Video from YouTube</h1>
            <div className='app__downloader'>
               <div className="app__top">
                  <div className='app__url'>
                     <input
                        type="text"
                        placeholder="Paste link here..."
                        ref={(input) => { this.textInput = input; }}
                        onClick={this.selectText}
                     />
                     <div className="app__clear" >
                        <button onClick={this.clearUrl}>&times;</button>
                     </div>
                  </div>
                  <button className='button' onClick={this.handleClick}>Click</button>
               </div>
               <div className='app__term'>
                  <div>By using our service you are accepting our <Link to='/terms-of-service'>Terms of Service</Link></div>
               </div>
               <div className={this.props.errLoad}> Sorry, we have some error with your link</div>
               <div className={this.props.loader}>
                  <div className='loader__block'>
                     <div className="loader"></div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
export default Input;