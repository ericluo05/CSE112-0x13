/* jshint expr: true */
let r = Math.floor(Math.random() * 1000000000);
let companyName = "0x13_company_" + r;
let companyEmail = "0x13_company_" + r + "@0x13.com";
let companyPhone = r;
let firstName = "0x13_account_first_name_" + r;
let lastName = "0x13_account_last_name_" + r;
let userEmail = "0x13_user_" + r + "@0x13.com";
let userPhone = 9 + r;
let password = "0x13_password_" + r;

console.log(companyName);
console.log(companyEmail);
console.log(companyPhone);
console.log(firstName);
console.log(lastName);
console.log(userEmail);
console.log(userPhone);
console.log(password);

let test = {
  'tags': ['emmissary test'],
  'index.html - Site Element Existence': function(client) {
    client
      .url('http://localhost:3000')
      .pause(1000);

    client.useXpath();

    client.verify.title('Emissary');
    client.expect.element('//i[@class="entypo-left-open-mini"]')
      .to.be.present.before(500);
    client.expect.element('//i[@class="entypo-right-open-mini"]')
      .to.be.present.before(500);
    client.expect.element('//a[@class="btn btn-secondary"]')
      .to.be.present.before(500);

    // client.expect.element('//section[@class="site-logo"]')
    //   .to.be.present.before(500);
    // client.expect.element('//select[@id="cc2"]')
    //   .to.be.present.before(500);
    // client.expect.element('//input[@name="number"]')
    //   .to.be.present.before(500);
    // client.expect.element('//button[@type="submit"]')
    //   .to.be.present.before(500);
    // client.expect.element('//input[@id="telnum"]')
    //   .to.be.present.before(500);
    // client.click('//select[@id="cc1"]').pause(1000);
    // client.setValue('//input[@id="number"]', '5622131234').pause(500);
    // client.click('.//button[@type="submit"]').pause(2000);


    //client.click('//select[@id="cc2"]').pause(1000);
    //client.setValue('//input[@id="telnum"]', '5622131234').pause(500);
    //client.click('.//button[@id="formatsubmit"]').pause(2000);

    client.end();
  },
  'signup.html - Site Element Eistence and Signup Test' : function(client) {
    client
      .url('http://localhost:3000/signup')
      .pause(1000);

    client.useXpath();

    client.verify.title('Login');
    client.expect.element('//img[@alt="logo"]').to.be.present;
    client.assert.containsText('//div[@class="form-top"]/h1', "Step 1/2");
    client.assert.containsText('//div[@class="form-top"]/p',
      "Create a company");

    client.expect
      .element('//div[@class="form-group"]/input[@id="form-company-name"]')
      .to.be.present;
    client
      .setValue('//div[@class="form-group"]/input[@id="form-company-name"]',
      companyName)
      .pause(50);

    client
      .expect.element('//div[@class="form-group"]/input[@id="form-email"]')
      .to.be.present;
    client
      .setValue('//div[@class="form-group"]/input[@id="form-email"]',
      companyEmail)
      .pause(50);

    client
      .expect.element('//div[@class="form-group"]/input[@id="form-phone"]')
      .to.be.present;
    client
      .setValue('//div[@class="form-group"]/input[@id="form-phone"]',
      companyPhone).pause(50);

    client.click('//button[@id="submit-company-btn"]');
    client.pause(2000);

    //client.assert.containsText('//fieldset[1]/div[@class="form-top"]/h1',
    //  "Step 2/2");
    //client.assert.containsText('//div[@class="form-top"]/p',
    //  "Create an user account");

    client
      .expect
      .element('//div[@class="form-group"]/input[@id="form-employee-first"]')
      .to.be.present;
    client
      .setValue('//div[@class="form-group"]/input[@id="form-employee-first"]',
      firstName);

    client
      .expect
      .element('//div[@class="form-group"]/input[@id="form-employee-last"]')
      .to.be.present;
    client
      .setValue('//div[@class="form-group"]/input[@id="form-employee-last"]',
      lastName);

    client
      .expect
      .element('//div[@class="form-group"]/input[@id="form-employee-email"]')
      .to.be.present;
    client
      .setValue('//div[@class="form-group"]/input[@id="form-employee-email"]',
      userEmail);

    client
      .expect
      .element('//div[@class="form-group"]/input[@id="form-employee-phone"]')
      .to.be.present;
    client
      .setValue('//div[@class="form-group"]/input[@id="form-employee-phone"]',
      userPhone);

    client
      .expect
      .element('//div[@class="form-group"]/input[@id="form-password"]')
      .to.be.present;
    client
      .setValue('//div[@class="form-group"]/input[@id="form-password"]',
      password);

    client
      .expect
      .element('//div[@class="form-group"]/input[@id="form-repeat-password"]')
      .to.be.present;
    client
      .setValue('//div[@class="form-group"]/input[@id="form-repeat-password"]',
      password);

    client.pause(1000);
    client.click('//button[@id="submit-btn"]');

    client.pause(5000);
    client.end();
  }
};

module.exports = test;
