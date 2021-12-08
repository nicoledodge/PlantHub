//third party API with image detection-- FUTURE DEVELOPMENT

// import React from 'react';
// import FormData from "form-data";
// import fs from "fs";
// import axios from "axios";
//
// export default class ImageAPI extends React.Component {
//
//     constructor(){
//         super();
//         this.state = {
//             selectedFile:'',
//         }
//
//         this.handleInputChange = this.handleInputChange.bind(this);
//     }
//
//     handleInputChange(event) {
//         this.setState({
//             selectedFile: event.target.files[0],
//         })
//     }
//
//     async submit(){
//
//         const data = new FormData();
//
//         data.append('file', this.state.selectedFile)
//
//         console.warn(this.state.selectedFile);
//
//         let url = 'https://my-api.plantnet.org/v2/identify/all?api-key=2b10KCVsL6mSS3JGvjFaq6eh0u';
//
//         return await axios.post(url, data, {
//                 headers: {
//                     'accept': 'application/json',
//                     'Accept-Language': 'en-US,en;q=0.8',
//                     'Content-Type': `multipart/form-data;`,
//                     'crossDomain': true,
//                     "Access-Control-Allow-Origin": "*",
//                     "Access-Control-Allow-Headers": "origin, content-type, Authorization",
//                     "Access-Control-Allow-Methods": "POST"
//                 }
//             }
//         ).then((response) => {
//             console.log(response)
//         }).catch((error) => {
//             console.log(error)
//         });
//
//
//     }
//
//     render(){
//         return(
//             <div>
//                 <div className="row">
//                     <div className="col-md-6 offset-md-3">
//                         <br /><br />
//
//                         <h3 className="text-white">React File Upload - Nicesnippets.com</h3>
//                         <br />
//                         <div className="form-row">
//                             <div className="form-group col-md-6">
//                                 <label className="text-white">Select File :</label>
//                                 <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
//                             </div>
//                         </div>
//
//                         <div className="form-row">
//                             <div className="col-md-6">
//                                 <button type="submit" className="btn btn-dark" onClick={()=>this.submit()}>Save</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
//
// }