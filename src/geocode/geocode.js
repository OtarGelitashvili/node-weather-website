const request=require('request')
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoib3RvdG8iLCJhIjoiY2s0djV4cHh3MGtpMTNqbXJhYmE4emZrbiJ9._5-mV2lC2I9COBE0RBEn4w";
  
      request({url:url,json:true},(error,{body})=>{
        if(error){
          callback('unable to connect web server',undefined);}
          else if( body.features.length===0) {
              callback('can not find location. please try again',undefined)
          }
          else {
            callback(undefined,{
              longtitude:body.features[0].center[0],
              latitude:body.features[0].center[1],
              location:body.features[0].place_name
            })
          }
       })
  }
  module.exports=geocode;