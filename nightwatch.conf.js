module.exports = (function (settings) {
 
  //Setting chromedriver path at runtime to run on different architectures
  if (process.platform === "darwin") {
    settings.selenium.cli_args["webdriver.chrome.driver"] = "./node_modules/chromedriver/bin/chromedriver";
  }
  else if (process.platform === "win32" || process.platform === "win64") {
    settings.selenium.cli_args["webdriver.chrome.driver"] = "./drivers/selenium/chrome/chromedriver.exe";
  }
 
  return settings;
 
})(require('./nightwatch.json'));