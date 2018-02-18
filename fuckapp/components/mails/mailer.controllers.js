//Modules
const nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    vars = require('../../config/var.json');

/**
 * Function to send a dummy email
 *
 * @param email Email to send
 * @param res
 */
exports.sendEmail = function(email, res){
    let transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
            user: vars.development.email,
            pass: vars.development.password
        },
        debug: true // include SMTP traffic in the logs,
    }));
    let mailOption = {
        from: vars.development.email,
        to: email,
        subject: 'Asunto Prueba',
        text:'Login correcto PRUEBA'
    };

    transporter.sendMail(mailOption)
        .then(res.status(200).json({message: "Email sent "+email}))
        .catch(error => res.status(500).json({error_message:error}));
};

/**
 * Send email to User @param email with the password passed in @param password
 *
 * @param email Email to
 * @param password Password to send
 * @param res Response
 */
exports.sendNewPasswordEmail = function(email, password, res){
    let transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
            user: vars.development.email,
            pass: vars.development.password
        },
        debug: true // include SMTP traffic in the logs,
    }));
    let mailOption = {
        from: vars.development.email,
        to: email,
        subject: 'Asunto Prueba',
        text:'Your new password is '+ password
    };

    transporter.sendMail(mailOption)
        .then(res.status(200).json({message: "Email sent "+email}))
        .catch(error => res.status(500).json({error_message:error}));
};