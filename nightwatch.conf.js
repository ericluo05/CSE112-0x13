module.exports = (function (settings) {
 
  //Setting chromedriver path at runtime to run on different architectures
  if (process.platform === "darwin") {
    settings.selenium.cli_args["webdriver.chrome.driver"] = "./drivers/selenium/chrome/mac64/chromedriver";
  }
  else if (process.platform === "win32" || process.platform === "win64") {
    settings.selenium.cli_args["webdriver.chrome.driver"] = "./drivers/selenium/chrome/win32/chromedriver.exe";
  }
  else if (process.platform === "linux" ) {
    settings.selenium.cli_args["webdriver.chrome.driver"] = "./drivers/selenium/chrome/linux32/chromedriver";
  }
  return settings;
 
})(require('./nightwatch.json'));