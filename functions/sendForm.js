const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phonePattern = /[\d ()+-]{8,}/;
const capitalize = require("capitalize");
const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: process.env.APIKEY, domain: process.env.HOST });

exports.handler = function (event, _, callback) {
  let formData = {
    ...JSON.parse(event.body),
  };

  if (!formData.name || !formData.email || !formData.message) {
    callback(null, {
      statusCode: 400,
      body: "Navn, email og besked er påkravet",
    });
    return;
  }

  if (
    typeof formData.name !== "string" ||
    typeof formData.email !== "string" ||
    typeof formData.message !== "string"
  ) {
    callback(null, {
      statusCode: 400,
      body: "Sendte form data med forkerte data typer",
    });
    return;
  }
  if (!emailPattern.test(formData.email)) {
    callback(null, { statusCode: 400, body: "Email er ikke gyldig" });
    return;
  }
  if (formData.phone) {
    if (!phonePattern.test(formData.phone)) {
      callback(null, { statusCode: 400, body: "Tlf er ikke gyldig" });
      return;
    }
  }
  if (formData.message.length < 80) {
    callback(null, { statusCode: 400, body: "Besked er for kort" });
    return;
  }

  //Email form
  const email = {
    from: formData.email,
    to: process.env.EMAIL,
    subject: capitalize.words(formData.name) + " | " + process.env.WEBSITE,
    html: `
    <main>
    <h4 style="margin:0 0 3px 0;">Navn: ${capitalize.words(formData.name)}</h4>
    ${formData.phone && `<h4 style="margin:0;">Tlf: ${formData.phone}</h4>`}
    <p style="margin:1rem 0 0 0;">${formData.message}</p>
    </main>
    `,
  };

  //Send data to my email
  mg.messages().send(email, function (error) {
    if (error) {
      callback(null, { statusCode: 500, body: error });
      return;
    } else {
      callback(null, { statusCode: 200, body: "Email var sendt" });
      return;
    }
  });
};
