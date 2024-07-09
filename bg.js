function sendScheduledEmail() {
    const emailTaskJson = localStorage.getItem('scheduledEmailTask');
    if (!emailTaskJson) {
        return;
    }

    const emailTask = JSON.parse(emailTaskJson);

    if (Date.now() >= emailTask.scheduledTime) {
        const templateParams = {
            from_name: emailTask.name,
            to_name: emailTask.name,
            to_email: emailTask.email,
            message_html: "Please find your vehicle report attached.",
            attachment: emailTask.pdfData
        };

        emailjs.send('service_vjpix1h', 'template_avriwxl', templateParams)
            .then((response) => {
                console.log('Email sent successfully:', response.status, response.text);
                localStorage.removeItem('scheduledEmailTask');
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
            });
    }
}

setInterval(sendScheduledEmail, 60 * 1000); // Check every minute
