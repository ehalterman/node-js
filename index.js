const express = require('express')
const app = express();
const path = require('path')
const port = 5000

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/calculate', handleRate);

// start the server listening
app.listen(port, function () {
  console.log('Node app is running on port', port);
});

//
function handleRate(req, res) {
  const weight = Number(req.query.weight);
  const method = req.query.mailType;

  calculateRate(res, weight, method);
}

function calculateRate(res, weight, type) {
  let result = 0;

  if (type == "Stamped Letter") {
    if (result <= 1) {
      result = 0.55;
    } else if (1 <= result < 2) {
      result = 0.70;
    } else if (2 <= result < 3) {
      result = 0.85;
    } else if (3 <= result < 3.5) {
      result = 1.00;
    } 
    }else if (type == "Metered Letter") {
      if (result <= 1) {
        result = 0.50;
      } else if (1 <= result < 2) {
        result = 0.65;
      } else if (2 <= result < 3) {
        result = 0.80;
      } else if (3 <= result < 3.5) {
        result = 0.95;
      } }
      else if (type == "Large Flat Envelope") {
        if (result <= 1) {
          result = 1.00;
        } else if (1 <= result < 2) {
          result = 1.20;
        } else if (2 <= result < 3) {
          result = 1.40;
        } else if (3 <= result < 4) {
          result = 1.60;
        } else if (4 <= result < 5) {
          result = 1.80;
        } else if (5 <= result < 6) {
          result = 2.00;
        } else if (6 <= result < 7) {
          result = 2.20;
        } else if (7 <= result < 8) {
          result = 2.40;
        } else if (8 <= result < 9) {
          result = 2.60;
        } else if (9 <= result < 10) {
          result = 2.80;
        } else if (10 <= result < 11) {
          result = 3.00;
        } else if (11 <= result < 12) {
          result = 3.20;
        } else if (12 <= result < 13) {
          result = 3.40;
        }
      } else if (type == "First-Class Package") {
        if (0 <= weight <= 4) {
          result = 3.80;
        } else if (5 <= weight <= 8) {
          result = 4.60;
        } else if (9 <= weight <= 12) {
          result = 5.30;
        } else if (12 < weight <= 13) {
          result = 5.90;
        }
      }
    
    const params = {
      method: type,
      weight: weight,
      result: result
    };

    res.render('pages/result', params);
  }