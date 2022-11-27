const BasePage = require("./BasePage");

const itemNameLocator = `//div[@class='checkout__cart-item-name']/a[@href='/product/719-31-184/coat-mentor/']`;
const itemPriceLocator = `//div[@class='checkout__cart-item-final-price']/span`;

class BagPage extends BasePage {
  static PAGE_URL = 'https://znwr.ru/order/checkout/';
  
  openPage = async () => super.openPage(BagPage.PAGE_URL);

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

}

module.exports = BagPage;