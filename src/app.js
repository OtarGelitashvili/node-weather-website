const express=require('express');
const path=require('path');
const hbs=require('hbs');
const geocode=require('./geocode/geocode.js');
const forecast=require('./forecast/forecast.js');

const app=express();


const publicDirectoryPath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

app.set('view engine','hbs')
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

 app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'01.23.2020'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'01.23.2020'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'this is some helpful text',
        title:'help page',
        name:'01.23.2020'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'No address'
        })
    }
    
    geocode(req.query.address,(error,{longtitude,latitude,location}={})=>{
        if(error){
          return res.send(error);
         }
    
      forecast(longtitude,latitude,(error,forecastdata)=>{
        if(error)
        {
          res.send(error)
        }
    
        res.send({
            forecast:forecastdata,
            location,
            address:req.query.address
        })
      })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'You must provide a search'
            
        })
    }
    console.log(req.quer);
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'GELITA',
        ErrorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'GELITA',
        ErrorMessage:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log('server is up on port:-> localhost:3000');
})