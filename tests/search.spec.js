const webdriver = require("selenium-webdriver");
const { expect } = require('chai');
const WomanPage = require("../pages/WomanPage");

const capabilities = require("../capabilities.json");

describe('Search product test.', () => {
  const bstackURL = 'http://bsuser_qswnej:xsMrKvsNSzP7SsTw5D52@hub-cloud.browserstack.com/wd/hub';

  beforeEach(async function () {
    this.driver = new webdriver.Builder()
        .usingServer(bstackURL)
        .withCapabilities({
          ...capabilities,
          ...capabilities['browser'] && { browserName: capabilities['browser']}
        })
        .build();
        await this.driver.manage().window().maximize();
  });

  it('Should contain products.', async function () {
    const searchedProduct = "Платье";

    const womanPage = new WomanPage(this.driver);
    await womanPage.openPage();
    await womanPage.selectCountry();

    await womanPage.clickSearchInputButton();
    await womanPage.clickSearchInputField();
    const searchResultsPage = await womanPage.searchProduct(searchedProduct);
    const resultElements = await searchResultsPage.checkSearchResults();
    const resultElementsLength = resultElements.length;

    const selectText = await searchResultsPage.getSelectText();
    
    expect(selectText).to.contains(`${resultElementsLength}`);
  }).timeout(90000);

  afterEach(async function () {
    await this.driver.quit();
  })
});