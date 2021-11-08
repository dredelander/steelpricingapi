//const hostname = '127.0.0.1'
const PORT =  8000;
const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');

const articles = [];


app.get('/', (req, res) => {
    res.json('Steel Market Price Publications API!')
    
  });

app.get('/news',(req,res)=>{
    axios.get('https://www.mining-technology.com/sector/commodities/base-metals/').then((response) =>{
          const html = response.data;
          const $ = cheerio.load(html);

          $('a:contains("price")', html).each(function(){
              const title = $(this).text();
              const link = $(this).attr('href');
              articles.push({
                  title,
                  link
              });
              console.log(title);
              console.log(link);
          });
          res.json(articles);
          
      }).catch((err) => {
          console.log(err);
      });      
  })

  app.get('/rigs',(req,res)=>{
    axios.get('https://www2.gerdau.com/market-update').then((response) =>{
          const html = response.data;
          const $ = cheerio.load(html);

          $('a:contains("Oil and Gas Rotary Rig Counts (U.S)")', html).each(function(){
              const title = $(this).text();
              const link = $(this).attr('href');
              const target = $(this).parent().parent().siblings().children().text()
             

              
              articles.push({
                  title,
                  link,
                  target
              });
              console.log(title);
              console.log(link);
              console.log(target);
              
          });
          res.json(articles);
          
      }).catch((err) => {
          console.log(err);
      });      
  })

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}/`);
  });