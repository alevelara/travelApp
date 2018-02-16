//Modules
var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    vars = require('../../config/var.json'),
    logger = require('../../components/logger/logger');

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
            logger.error(email);
            logger.error(error.message);
        }else{
            logger.debug(email);
            logger.debug("Email sent");
        }
    });

};

exports.sendNewPasswordEmail = function(email, password, res){
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
            logger.error(email);
            logger.error(error.message);
            res.status(500);
        }else{
            logger.debug(email);
            logger.debug("Email sent");
            res.status(200);
        }
    });

};