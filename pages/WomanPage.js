const BasePage = require("./BasePage");
const SearchResultsPage = require("./SearchResultsPage");

const { Key } = require("selenium-webdriver");

const searchInputButtonId = 'header__search-btn';
const searchInputFieldLocator = `//div[@class='catalog__search']//input[@placeholder='Поиск товаров']`;

class WomanPage extends BasePage {
  static PAGE_URL = 'https://znwr.ru/catalog/woman/';
  
  openPage = async () => super.openPage(WomanPage.PAGE_URL);

  async clickSearchInputButton() {
    const searchButton = await this.findById(searchInputButtonId);
    await searchButton.click();

    return this;
  }

  async clickSearchInputField() {
    const searchButton = await this.findByXpath(searchInputFieldLocator);
    await searchButton.click();

    return this;
  }

  async searchProduct(productName){
    const element = await this.findByXpath(searchInputFieldLocator);
    await element.sendKeys(productName, Key.ENTER);

    return new SearchResultsPage(this.driver, productName);
  }
}

module.exports = WomanPage;