/* jshint expr: true */
module.exports = {
  tags: ['Phone Validation'],
  'Site Element Existence' : function (client) {
    client
      .url('http://localhost:3000/phone')
      .pause(1000);

    client.useXpath();

    
    client.verify.title('Phone Validation');
    client.expect.element('//select[@id="cc1"]').to.be.present.before(500);
    client.expect.element('//input[@name="number"]').to.be.present.before(500);
    client.expect.element('//button[@type="submit"]').to.be.present.before(500);
    client.click('//select[@id="cc1"]').pause(1000);
    client.setValue('//input[@id="number"]', '5622131234').pause(500);
    
    client.click('.//button[@type="submit"]').pause(5000);
  //  client.expect.element('body').to.have.attribute('class').which.contains('vasq');
  //  client.expect.element('body').to.have.attribute('class').which.matches(/vasq$/);
  //  client.expect.element('body').to.have.attribute('class').before(1000);


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
