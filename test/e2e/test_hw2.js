/* jshint expr: true */
module.exports = {
  'tags': ['Phone Validation'],
  'Site Element Existence': function(client) {
    client
      .url('http://localhost:3000/phone')
      .pause(1000);

    client.useXpath();

    client.verify.title('Phone Validation');
    client.expect.element('//select[@id="cc1"]').to.be.present.before(500);
    client.expect.element('//select[@id="cc2"]').to.be.present.before(500);
    client.expect.element('//input[@name="number"]').to.be.present.before(500);
    client.expect.element('//button[@type="submit"]').to.be.present.before(500);
    client.expect.element('//input[@id="telnum"]').to.be.present.before(500);
    client.click('//select[@id="cc1"]').pause(1000);
    client.setValue('//input[@id="number"]', '5622131234').pause(500);
    client.click('.//button[@type="submit"]').pause(2000);


    client.click('//select[@id="cc2"]').pause(1000);
    client.setValue('//input[@id="telnum"]', '5622131234').pause(500);
    client.click('.//button[@id="formatsubmit"]').pause(2000);

    client.end();
  },
};
