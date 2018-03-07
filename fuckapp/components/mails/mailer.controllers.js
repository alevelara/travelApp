//Modules
const nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    vars = require('../../config/var.json');

/**
 * Function to send a dummy email
 *
 * @param email Email to send 
 */
exports.sendEmail = function(email){
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
        .then(console.log("Email sent " + email)        
    )};

/**
 * Send email to User @param email with the password passed in @param password
 *
 * @param email Email to
 * @param password Password to send 
 */
exports.sendNewPasswordEmail = function(email, password){
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
        .then(console.log("Email sent " + email)        
    )};