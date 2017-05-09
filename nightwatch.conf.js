module.exports = function(settings) {
  // Setting chromedriver path at runtime to run on different architectures
  if (process.platform === 'darwin') {
    settings.selenium.cli_args['webdriver.chrome.driver'] = './drivers/selenium/chrome/mac64/chromedriver';
    settings.selenium.cli_args['webdriver.gecko.driver'] = './drivers/selenium/firefox/mac64/geckodriver';
    settings.selenium.cli_args['webdriver.safari.driver'] = '/usr/bin/safaridriver';
  } else if (process.platform === 'win32' || process.platform === 'win64') {
    settings.selenium.cli_args['webdriver.chrome.driver'] = './drivers/selenium/chrome/win32/chromedriver.exe';
    settings.selenium.cli_args['webdriver.gecko.driver'] = './drivers/selenium/firefox/win32/geckodriver.exe';
    settings.selenium.cli_args['webdriver.edge.driver'] = './drivers/selenium/edge/MicrosoftWebDriver.exe';
  } else if (process.platform === 'linux' ) {
    settings.selenium.cli_args['webdriver.chrome.driver'] = './drivers/selenium/chrome/linux64/chromedriver';
    settings.selenium.cli_args['webdriver.gecko.driver'] = './drivers/selenium/firefox/linux64/geckodriver';
  }
  return settings;
}(require('./nightwatch.json'));
