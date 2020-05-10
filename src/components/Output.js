import React from 'react';
import Input from '../components/Input';
import InfoDownload from '../components/InfoDownload'

class Output extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         hits: [],
         video: [],
         classNone: 'y__none',
         loader: 'y__none',
         errLoad: 'y__none',
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
      window.location.href = fullUrl + '&title=' + this.state.hits.title.replace("#", "");
   }

   render() {
      const { hits } = this.state;
      const { video } = this.state;
      return (
         <div>
            <Input
               updateData={this.updateData}               
               loader={this.state.loader}
               errLoad={this.state.errLoad}
            />
            <div className={this.state.classNone}>
               <div className='y__download '>
                  <div className='y__img'>
                     <img
                        src={hits.thumbnail}
                        alt={hits.title}>
                     </img>
                  </div>
                  <div className='y__info'>
                     <div className="y__title">{hits.title}</div>
                     <div className="y__time">{this.time(hits.time)}</div>
                     <div className="y__downlist">
                        <ul className='y__ulist'>
                           {video.map(hit =>
                              <li key={hit.url} className='y__li-list'>
                                 <span className='button__lires'>{hit.qualityLabel}</span>                              
                                 <div className='button__li' onClick={this.download.bind(this,hits.url,hit.qualityLabel,hit.url)}>Download</div>
                              </li>
                           )}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <InfoDownload />
         </div>
      )
   }
}
export default Output;