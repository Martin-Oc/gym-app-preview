var express = require("express");
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require("cors");
var app = express();


app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// app.use(cors(bodyParser.json()));


app.get('/skuska', (req,res)=>{
    res.status(200).json({message: 'skuska'})
})


app.post("/sendmail", (req, res) => {
    let body = req.body;

    sendMail(body, info => {
        console.log(`The mail has beed send`);
        res.send(info);
    });
    res.status(200).json(body)
 });

async function sendMail(body,callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'ockay.dev@gmail.com',
            pass: 'kivzzouodumfgfil'
        }
    });
    let mailOptions = {
        // from: 'ockay.dev@gmail.com', // sender address
        from: `"${body.name}"<${body.email}>`,
        to: 'ockaymartin@gmail.com', // list of receivers
        subject: "Ockay Template", // Subject line
        html: ` <h1>${body.email}</h1><br>
        <h2>${body.desciption}</h2>`
    };
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    callback(info);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

