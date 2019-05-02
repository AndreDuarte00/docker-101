const express = require('express')
const app = express()
const dns = require('dns')

const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'mysql',
  user     : 'docker101',
  password : 'docker101',
  database : 'docker101'
});

app.get('/', (req, res) => {

  // Forgive the callback hell 😂
  dns.lookup('mysql', function(err, ip) {
    dns.lookup('proxy', function(err, ipProxy) {
      console.log(ip);
      console.log(ipProxy);


      connection.query('SELECT * FROM tasks', function (error, results, fields) {
        if (error) throw error;
        console.log(results)

        let string  = `
          <style>
            body {margin:0;padding:0;font-family: "Helvetica Neue";}
            .hello {
              display: flex;
              align-items: center;
              flex-direction: column;
              text-align: center;
              font-family: "Helvetica Neue";
              font-size: 15px;
              letter-spacing: 1px;
            }
          </style>
          <div class="hello">
            <img src="https://i2.wp.com/m-square.com.au/wp-content/uploads/2016/03/blog.docker.comwp-contentuploadsSwarmnado-357x627-30-1-934fa07801df981bf9dca22fb7d4f8252c4ea8f4-2.gif?resize=350%2C200&ssl=1" /><br />
            Hello from docker 🙄
            <br /><br />
            I am connected to mysql @(${ip}) and nginx @(${ipProxy}), look i can show the tasks table:
            <br />
            <br />
        `

        results.forEach(element => {
          string += `${element.id} - ${element.name}<br />`
        });

        string += `</div>`;

        res.send(string)
      });
    });
  });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
