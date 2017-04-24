/* jshint expr: true */
module.exports = {
  tags: ['google'],
  'Site Element Existence' : function (client) {
    client
      .url('http://localhost:3000/phone')
      .pause(1000);

    client.useXpath();

    /*
    client.verify.title('Phone Validation');
    client.expect.element('//input[@name="country_code_0"]').to.be.present.before(500);
    client.expect.element('//select[@name="country_code_1"]').to.be.present.before(500);
    client.expect.element('//input[@name="number"]').to.be.present.before(500);
    client.expect.element('//button[@type="submit"]').to.be.present.before(500);
    client.setValue('.//input[@name="country_code_0"]', '86').pause(1000);
    client.click('.//button[@type="submit"]').pause(2000);
    */

    /*
    client.expect.element('body').to.be.present;

    client.expect.element('#lst-ib').to.have.css('display');

    client.expect.element('body').to.have.attribute('class').which.contains('vasq');
    client.expect.element('body').to.have.attribute('class').which.matches(/vasq$/);
    client.expect.element('body').to.have.attribute('class').before(1000);

    client.expect.element('#lst-ib').to.be.enabled;

   // client.expect.element('#hplogo').text.to.match(/Norge/).before(1000);

    client.setValue('#lst-ib', 'Norway').pause(500);
    client.expect.element('#lst-ib').to.have.value.equal('Norway');
    client.expect.element('#lst-ib').to.be.an('input');
    client.expect.element('#lst-ib').to.be.not.selected;
    client.expect.element('#lst-ib').to.be.visible;
    */
    client.end();
  },
  'Country: United States' : function(client) {
    client.url('http://localhost:3000/phone').pause(1000);
    client.useXpath();

    /*
    client.setValue('//input[@name="country_code_0"]', "52").pause(500);
    client.click('//select[@name="country_code_1"] //option[@value="52"]').pause(500);
    client.setValue('//input[@name="number"]', '5512345678').pause(500);
    client.click('//button[@type="submit"]').pause(1000);
    client.pause(5000);
    */
    client.end();
  }
};
