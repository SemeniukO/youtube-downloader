import React from 'react';
import Input from '../components/Input';
import InfoDownload from '../components/InfoDownload'

class Output extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         url:'',
         info: [],
         video: [],
         classNone: false,
         loader: false,
         errLoad: false,
      };
   }

   time(data) {
      if (data) {
         let minutes = Math.floor(data / 60);
         let second = data % 60;
         if (minutes < 10) minutes = '0' + minutes;
         if (second < 10) second = '0' + second
         return (minutes + ':' + second)
      }
      return '';
   }
   updateData = (value) => {
      this.setState(value);      
   }

   download(url, qualityLabel, fullUrl) {
      if (qualityLabel === '360p') {
         return window.location.href = `http://localhost:3001/download360?URL=${url}&quality=${qualityLabel}`;
      }
      window.location.href = fullUrl + '&title=' + this.state.info.title.replace("#", "");
   }

   render() {
      const { info, video } = this.state;
      return (
         <div>
            <Input
               url={this.state.url}
               updateData={this.updateData}               
               loader={this.state.loader}
               errLoad={this.state.errLoad}
            />
            {
               this.state.classNone ?
               <div className='zoomIn'>
               <div className='y__download '>
                  <div className='y__img'>
                     <img
                        src={info.thumbnail}
                        alt={info.title}>
                     </img>
                  </div>
                  <div className='y__info'>
                     <div className="y__title">{info.title}</div>
                     <div className="y__time">{this.time(info.time)}</div>
                     <div className="y__downlist">
                        <ul className='y__ulist'>
                           {video.map(info =>
                              <li key={info.url} className='y__li-list'>
                                 <span className='button__lires'>{info.qualityLabel}</span>                              
                                 <div className='button__li' onClick={this.download.bind(this,this.state.url,info.qualityLabel,info.url)}>Download</div>
                              </li>
                           )}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            : null
            }
            <InfoDownload />
         </div>
      )
   }
}
export default Output;