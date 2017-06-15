/* jshint expr: true */
let r = Math.floor(Math.random() * 1000000000);
let companyName = '0x13_company_' + r;
let companyEmail = '0x13_company_' + r + '@0x13.com';
let companyPhone = r%1000000000 + 1000000000;
let firstName = '0x13_account_first_name_' + r;
let lastName = '0x13_account_last_name_' + r;
let userEmail = '0x13_user_' + r + '@0x13.com';
let userPhone = companyPhone+9;
let password = '0x13_password_' + r;

let newPageWaitTime = 1000;
let enterValueWaitTime = 500;

console.log(companyName);
console.log(companyEmail);
console.log(companyPhone);
console.log(firstName);
console.log(lastName);
console.log(userEmail);
console.log(userPhone);
console.log(password);

let testServer = 'http://localhost:3000';

let width = 1280;
let height = 800;

let browserInit = function(client_) {
  client_.resizeWindow(width, height);
}

let login = function(client_) {
  client_.url(testServer + '/login').pause(newPageWaitTime);
  client_.useXpath();
  client_
    .setValue('//input[@id="username"]',
    userEmail)
    .pause(enterValueWaitTime);
  client_
    .setValue('//input[@id="password"]',
    password)
    .pause(enterValueWaitTime);
  client_.click('//button[@id="loginButton"]')
    .pause(1000);
  client_.pause(newPageWaitTime);
}

let verifyCompanyName = function(client_) {
  client_.assert.containsText('//div[@id="company-name"]/h1/span',
    firstName + ' ' + lastName);
}

let verifyMenu = function(client_) {
  client_.source(function(res) {
    console.log(res);
  })
  //client_
  //  .expect.element('//div[@class="page-container"]')
  //  .to.be.present;
  client_
    .click('//div[@class="sidebar-collapse"]')
    .pause(enterValueWaitTime);
  client_
    .expect.element('//div[@class="page-container sidebar-collapsed"]')
    .to.be.present;
  client_
    .click('//div[@class="sidebar-collapse"]')
    .pause(enterValueWaitTime);

  client_
    .assert.containsText(
      '//ul[@id="main-menu"]/li[1]//span',
      'Visitors');
  client_
    .assert.containsText(
      '//ul[@id="main-menu"]/li[2]//span',
      'Employees');
  client_
    .assert.containsText(
      '//ul[@id="main-menu"]/li[3]//span',
      'Appointments');
  client_
    .assert.containsText(
      '//ul[@id="main-menu"]/li[4]//span',
      'Forms');
  client_
    .assert.containsText(
      '//ul[@id="main-menu"]/li[5]//span',
      'Settings');
}


let test = {
  'tags': ['emmissary test'],
  'index.html - Site Element Existence': function(client) {
    browserInit(client);
    client
      .url(testServer)
      .pause(newPageWaitTime);

    client.useXpath();

    client.verify.title('Appt-o-matic');
    client.expect.element('//i[@class="entypo-left-open-mini"]')
      .to.be.present.before(500);
    client.expect.element('//i[@class="entypo-right-open-mini"]')
      .to.be.present.before(500);
    // client.expect.element('//a[@class="btn btn-secondary"]')
    //  .to.be.present.before(500);

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


    // client.click('//select[@id="cc2"]').pause(1000);
    // client.setValue('//input[@id="telnum"]', '5622131234').pause(500);
    // client.click('.//button[@id="formatsubmit"]').pause(2000);

    client.end();
  },
  'signup.html - Site Element Existence and Signup Test': function(client) {
    browserInit(client);
    client
      .url(testServer + '/signup')
      .pause(newPageWaitTime);

    client.useXpath();

    client.verify.title('Login');
    client.expect.element('//img[@alt="logo"]').to.be.present;
    client.assert.containsText('//div[@class="form-top"]/h1', 'Step 1/2');
    client.assert.containsText('//div[@class="form-top"]/p',
      'Create a company');

    client.expect
      .element('//div[@class="form-group"]/input[@id="form-company-name"]')
      .to.be.present;
    client
      .setValue('//div[@class="form-group"]/input[@id="form-company-name"]',
      companyName)
      .pause(enterValueWaitTime);

    client
      .expect.element('//div[@class="form-group"]/input[@id="form-email"]')
      .to.be.present;
    client
      .setValue('//div[@class="form-group"]/input[@id="form-email"]',
      companyEmail)
      .pause(enterValueWaitTime);

    client
      .expect.element('//div[@class="form-group"]/input[@id="form-phone"]')
      .to.be.present;
    client
      .setValue('//div[@class="form-group"]/input[@id="form-phone"]',
      companyPhone).pause(enterValueWaitTime);

    client.click('//button[@id="submit-company-btn"]')
      .pause(1000);
    client.pause(newPageWaitTime);

    // client.assert.containsText('//fieldset[1]/div[@class="form-top"]/h1',
    //  "Step 2/2");
    // client.assert.containsText('//div[@class="form-top"]/p',
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

    client.pause(enterValueWaitTime);
    client.click('//button[@id="submit-btn"]')
      .pause(1000);

    client.pause(newPageWaitTime);
    client.end();
  },
  'signin.html - Site Element Existence and signin Test': function(client) {
    browserInit(client);
    client
      .url(testServer + '/login')
      .pause(newPageWaitTime);

    client.useXpath();

    client.verify.title('Appt-o-matic | Login');
    client.expect.element('//div[@class="login-content"]/a[@class="logo"]')
      .to.be.present;
    // client.assert.containsText('//div[@class="form-top"]/h1', 'Step 1/2');
    // client.assert.containsText('//div[@class="form-top"]/p',
    //   'Create a company');
    //
    client.expect
      // .element('//div[@class="input-group focused"]/input[@id="username"]')
      .element('//input[@id="username"]')
      .to.be.present;
    client
      // .setValue('//div[@class="input-group focused"]/input[@id="username"]',
      .setValue('//input[@id="username"]',
      userEmail)
      .pause(enterValueWaitTime);

    client
      .expect.element('//div[@class="input-group"]/input[@id="password"]')
      .to.be.present;
    client
      .setValue('//div[@class="input-group"]/input[@id="password"]',
      password)
      .pause(enterValueWaitTime);

    client
      .expect.element('//button[@id="loginButton"]')
      .to.be.present;
    client.click('//button[@id="loginButton"]')
      .pause(1000);
    client.pause(newPageWaitTime);

    // AFTER LOGIN


    verifyCompanyName(client);
    verifyMenu(client);
    //client.assert.containsText('//div[@id="company-name"]/h1/span',
    //  firstName + ' ' + lastName);
    // client.pause(2000);

    client
      .expect.element('//div[@class="dropdown"]')
      .to.be.present;
    client
      .expect.element('//div[@class="dropdown"]/ul[@class="dropdown-menu"]')
      .to.be.present;
    // client
    //   .assert
    //   .containsText('//div[@class="dropdown"]/ul[@class="dropdown-menu"]
    //  /li[1]/a',
    //   'Check-In');
    // client
    //   .assert
    //   .containsText('//div[@class="dropdown"]/ul[@class="dropdown-menu"]
    //  /li[2]/a',
    //   '                  Log Out ');
    client.end();
  },
  'visitors - Site Element Existence Test': function(client) {
    browserInit(client);
    login(client);

    // AFTER LOGIN
    client.verify.title('Appt-o-matic | Visitors');
    verifyCompanyName(client);
    verifyMenu(client);
    // visitor page content
    client
      .expect
      .element('//div[@class="visitor-container"]/div[@id="visitor-queue"]')
      .to.be.present;

    client
      .assert
      .containsText(
      '//div[@class="visitor-container"]/div[@id="visitor-queue"]/h1',
      'Visitors');

    // table content
    client
      .assert
      .containsText(
      '//div[@class="visitor-container"]/div[@id="visitor-queue"]'
        + '/table//tr/th[1]',
      'First');

    client
      .assert
      .containsText(
      '//div[@class="visitor-container"]/div[@id="visitor-queue"]'
        + '/table//tr/th[2]',
      'Last');

    client
      .assert
      .containsText(
      '//div[@class="visitor-container"]/div[@id="visitor-queue"]'
        + '/table//tr/th[3]',
      'Appointment Time');

    client
      .assert
      .containsText(
      '//div[@class="visitor-container"]/div[@id="visitor-queue"]'
        + '/table//tr/th[4]',
      'Check-in Time');

    // client.pause(2000);
    client.end();
  },
  'employees - Site Element Existence Test': function(client) {
    browserInit(client);
    login(client);

    // AFTER LOGIN
    client.url(testServer + '/employees').pause(newPageWaitTime);
    client.verify.title('Appt-o-matic | Employees');
    verifyCompanyName(client);
    verifyMenu(client);

    // employees page content
    client
      .expect
      .element('//div[@class="employee-container"]/div[@id="visitor-queue"]')
      .to.be.present;

    client
      .assert
      .containsText(
      '//div[@class="employee-container"]/div[@id="visitor-queue"]/h1',
      'Employees');

    // // table content
    client
      .assert
      .containsText(
      '//div[@class="employee-container"]/div[@id="visitor-queue"]'
        + '/table//tr/th[1]',
      'First');

    client
      .assert
      .containsText(
      '//div[@class="employee-container"]/div[@id="visitor-queue"]'
        + '/table//tr/th[2]',
      'Last');

    client
      .assert
      .containsText(
      '//div[@class="employee-container"]/div[@id="visitor-queue"]'
        + '/table//tr/th[3]',
      'Phone Number');

    client
      .assert
      .containsText(
      '//div[@class="employee-container"]/div[@id="visitor-queue"]'
        + '/table//tr/th[4]',
      'Email');

    // client.pause(2000);
    client.end();
  },
  'appointment - Site Element Existence Test': function(client) {
    browserInit(client);
    login(client);

    // AFTER LOGIN
    client.url(testServer + '/appointments').pause(newPageWaitTime);
    client.verify.title('Appt-o-matic | Appointments');
    verifyCompanyName(client);
    verifyMenu(client);

    // employees page content
    client
      .expect
      .element('//div[@class="appt-container"]')
      .to.be.present;

    client
      .assert
      .containsText(
      '//div[@class="appt-container"]/div/h1',
      'Appointments');

    // // table content
    client
      .assert
      .containsText(
      '//div[@class="appt-container"]/div/table//tr/th[1]',
      'First Name');

    client
      .assert
      .containsText(
      '//div[@class="appt-container"]/div/table//tr/th[2]',
      'Last Name');

    client
      .assert
      .containsText(
      '//div[@class="appt-container"]/div/table//tr/th[3]',
      'Provider Name');

    client
      .assert
      .containsText(
      '//div[@class="appt-container"]/div/table//tr/th[4]',
      'Phone Number');

    client
      .assert
      .containsText(
      '//div[@class="appt-container"]/div/table//tr/th[5]',
      'Date');

    client
      .assert
      .containsText(
      '//div[@class="appt-container"]/div/table//tr/th[6]',
      'Time');

    client
      .expect
      .element(
      '//div[@class="appt-container"]/div[@class="row"]'
        + '//div[@class="add-button"]')
      .to.be.present;

    // client.pause(2000);
    client.end();
  },
  'form-builder - Site Element Existence Test': function(client) {
    browserInit(client);
    login(client);

    // AFTER LOGIN
    client.url(testServer + '/form-builder').pause(newPageWaitTime);
    client.verify.title('Appt-o-matic | Forms');
    verifyCompanyName(client);
    verifyMenu(client);

    // employees page content
    client
      .expect
      .element('//div[@class="main-content"]')
      .to.be.present;

    client
      .assert
      .containsText(
      '//div[@class="main-content"]/center/h1',
      'Build your form');

    client
      .assert
      .containsText(
      '//div[@class="main-content"]/center/h2',
      'Color picker:');

    client
      .expect
      .element(
      '//div[@class="main-content"]/center/div/input[@class="jscolor"]')
      .to.be.present;

    // check form
    client
      .expect
      .element(
      '//div[@class="main-content"]/form[@class="form-builder"]')
      .to.be.present;

    client
      .assert
      .containsText(
      '//div[@class="main-content"]/form[@class="form-builder"]'
        + '/div[1]/label[@for="f_name"]',
      'First Name');
    client
      .expect
      .element(
      '//div[@class="main-content"]/form[@class="form-builder"]'
        + '/div[1]/input[@id="f_name"]')
      .to.be.present;
    // enter field

    client
      .assert
      .containsText(
      '//div[@class="main-content"]/form[@class="form-builder"]'
        + '/div[2]/label[@for="l_name"]',
      'Last Name');
    client
      .expect
      .element(
      '//div[@class="main-content"]/form[@class="form-builder"]'
        + '/div[2]/input[@id="l_name"]')
      .to.be.present;
    // enter field

    client
      .assert
      .containsText(
      '//div[@class="main-content"]/form[@class="form-builder"]'
        + '/div[3]/label[@for="phone"]',
      'Phone Number');
    client
      .expect
      .element(
      '//div[@class="main-content"]/form[@class="form-builder"]'
        + '/div[3]/input[@id="phone"]')
      .to.be.present;
    // enter field

    client
      .assert
      .containsText(
      '//div[@class="main-content"]/form[@class="form-builder"]'
        + '/div[last()]/button[@type="button"]',
      'Add');

    client
      .assert
      .containsText(
      '//div[@class="main-content"]/form[@class="form-builder"]'
        + '/div[last()]/button[@type="submit"]',
      'Submit');
    client.end();
  },
  'settings - Site Element Existence Test': function(client) {

    // Login
    browserInit(client);
    login(client);

    // Go to settings page
    client.url(testServer + '/settings').pause(newPageWaitTime);

    // Verify general UI elements
    client.verify.title('Appt-o-matic | Settings');
    verifyCompanyName(client);
    verifyMenu(client);


    client.end();
  },
};

module.exports = test;
