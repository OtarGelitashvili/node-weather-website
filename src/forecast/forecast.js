const request=require('request')

const forecast=(longtitude,latitude,callback)=>
{
    const url='https://api.darksky.net/forecast/49a0db437536546f5ae4f2b0e649a14f/'+encodeURIComponent(longtitude)+','+encodeURIComponent(latitude);
    
        request({url,json:true},(error,{body})=>{
            if(error) {callback('unable to connect web server',undefined)}
            else if(body.error) {callback(' can not find location.try again',undefined)}
            else {
                callback(undefined,(body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a '
                 + body.currently.precipProbability + '% chance of rain.'))
            }
        })
}
module.exports=forecast;