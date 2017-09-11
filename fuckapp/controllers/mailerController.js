var nodemailer = require('nodemailer');

exports.sendEmail = function(email){
    
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'fkdevs@gmail.com',
            pass: 'FuckApp01'
        }  ,
        debug: true // include SMTP traffic in the logs,
    });

    var mailOption = {
        from: 'fkdevs@gmail.com',
        to: email,
        subject: 'Asunto Prueba',
        text:'Login correcto PRUEBA'
    };

    transporter.sendMail(mailOption, function(error, info){
        if(error){            
            console.log(email);
            console.log(error.message);
        }else{
            console.log(email);
            console.log("Email sent");
            //res.status(200).jsonp(req.body);
        }
    });

}