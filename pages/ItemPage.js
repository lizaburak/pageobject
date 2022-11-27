const BasePage = require("./BasePage");
const BagPage = require("./BagPage");

const addBagButtonId = 'product__add-cart-btn';
const itemNameLocator = `//h1[@class='product__title']`;
const itemPriceLocator = `//div[@class='product__price-new']`;
const addTextPopupLocator = `//*[@class='product__modal-cart-text-1']`;
const popupButtonCloseId = 'product__modal-cart-close';
const bagButtonLocator = `//a[@class='header__cart-btn']`;

class ItemPage extends BasePage {
  static PAGE_URL = 'https://znwr.ru/product/719-31-184/coat-mentor/';
  
  openPage = async () => super.openPage(ItemPage.PAGE_URL);

  async clickAddToBagButton() {
    const button = await this.findById(addBagButtonId);
    await button.click();

    return this;
  }

 async getProductName(){
    const element = await this.findByXpath(itemNameLocator);
    const elementText = await this.getItemText(element);

    return elementText;
 }

 async getProductPrice(){
    const element = await this.findByXpath(itemPriceLocator);
    const elementText = await this.getItemText(element);

    return elementText;
 }

 async getPopupText(){
    const element = await this.findByXpath(addTextPopupLocator);
    const elementText = await this.getItemText(element);

    return elementText;
 }

 async clickClosePopupButton() {
    const button = await this.findById(popupButtonCloseId);
    await button.click();

    return this;
  }

  async clickBagButton() {
    const button = await this.findByXpath(bagButtonLocator);
    await button.click();

    return new BagPage(this.driver);
  }

}

module.exports = ItemPage;