//Modules
var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    vars = require('../config/var.json');

exports.sendEmail = function(email){

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
            user: vars.development.email,
            pass: vars.development.password
        },
        debug: true // include SMTP traffic in the logs,
    }));

    var mailOption = {
        from: vars.development.email,
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
        }
    });

};

exports.sendNewPasswordEmail = function(email,password){
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
            user: vars.development.email,
            pass: vars.development.password
        },
        debug: true // include SMTP traffic in the logs,
    }));

    var mailOption = {
        from: vars.development.email,
        to: email,
        subject: 'Asunto Prueba',
        text:'Your new password is '+ password
    };

    transporter.sendMail(mailOption, function(error, info){
        if(error){            
            console.log(email);
            console.log(error.message);
        }else{
            console.log(email);
            console.log("Email sent");
        }
    });

};