const webdriver = require("selenium-webdriver");
const { expect } = require('chai');
const ItemPage = require("../pages/ItemPage");

const capabilities = require("../capabilities.json");

describe('Add items to bag test.', () => {
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

  it('Should add item to the bag.', async function () {
    const itemPage = new ItemPage(this.driver);
    await itemPage.openPage();
    await itemPage.selectCountry();

    const nameItem = await itemPage.getProductName();
    const priceItem = await itemPage.getProductPrice();

    await itemPage.clickAddToBagButton();

    const popupText = await itemPage.getPopupText();

    await itemPage.clickClosePopupButton();

    const bagPage = await itemPage.clickBagButton();

    const nameItemInBag = await bagPage.getProductName();
    const priceItemInBag = await bagPage.getProductPrice();

    expect(popupText).to.contains("ТОВАР ДОБАВЛЕН В КОРЗИНУ");
    expect(nameItem).to.contain("mentor");
    expect(nameItemInBag).to.contain("Mentor");
    expect(priceItem).to.contain("750");
    expect(priceItemInBag).to.contain("750");
  
  }).timeout(90000);

  afterEach(async function () {
    await this.driver.quit();
  })
});