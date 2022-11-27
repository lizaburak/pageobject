const { By, until } = require("selenium-webdriver");

const selectCountryLocator = `//*[@data-country-code='BY']`;

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async openPage(url) {
    await this.driver.get(url);

    return this;
  }

  async getPageUrl() {
    return this.driver.getCurrentUrl();
  }

  async findByXpath(xpath) {
    return this.driver.wait(until.elementLocated(By.xpath(xpath)), 8000)
  }

  async findAllByXpath(xpath) {
    return this.driver.wait(until.elementsLocated(By.xpath(xpath)), 8000);
}

  async findById(id) {
    return this.driver.wait(until.elementLocated(By.id(id)), 8000)
  }

  async selectCountry() {
    const element = await this.findByXpath(selectCountryLocator);
    await element.click();

    await this.driver.sleep(2000);

    return this;
  }

  async getItemText(item){
    return await item.getText();
  }
}

module.exports = BasePage;