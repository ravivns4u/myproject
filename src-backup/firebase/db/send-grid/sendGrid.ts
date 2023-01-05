import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(`${process.env.SENDGRID_API_KEY}`);

export const sendEmailToSendGrid = async (data: any) => {
    try {
        await sendgrid.send({
            to: `${data.to}`,
            from: `${process.env.SENDGRID_MAIL_ID}`,
            subject: "Break Free Account Approval",
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Break free - verification mail</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        </head>
        <body>
            <h6>Hey!</h6>
            <h6>Your account has been verified and approved.</h6>
            <h6>Now, you can simply login > setup your portfolio > Add your offerings and begin your journey with us.</h6>
            <h6>Excited to have you on board!</h6>
            <h6>Team Break Free</h6>    
      </body>
      </html>`,
        });
        return true;
    } catch (error) {
        console.log("Error happened: ", error);
        return false;
    }
};
