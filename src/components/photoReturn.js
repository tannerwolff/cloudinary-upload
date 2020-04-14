import React, { Component } from 'react';
import axios from 'axios';
import {CloudinaryContext, Transformation, Image} from 'cloudinary-react';
export default class PhotoReturn extends Component {
    constructor(props){
        super(props)
        this.state = {
            gallery: []
        }
    }
    componentDidMount(){
        axios.get(`http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/list/cloud-upload.json`)
        .then(res => {
            this.setState({
              gallery: res.data.resources
            })
        }).catch(error =>{
          console.log("axios error", error)
        })
    }
    render() {
        return (
            <div>
                <CloudinaryContext cloudName = {process.env.CLOUD_NAME}>
                  {this.state.gallery.map(data =>{
                    return(

                      <div className="image" key={data.public_id}>
                        <a target="_blank" href={`https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/${data.public_id}.jpg`}>
                          <Image publicId = {data.public_id}>
                            <Transformation
                              crop="scale"
                              width="300"
                              height="200"
                              dpr="auto"
                              responsive_placeholder="blank" 
                            />
                          </Image>
                        </a>
                        <div> Created at {data.created_at}</div>
                      </div>
                    )
                  })}
                </CloudinaryContext>
            </div>
        );
    }
}