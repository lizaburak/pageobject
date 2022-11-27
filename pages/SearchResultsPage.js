const BasePage = require("./BasePage");

const selectTextLocator = `//h1[@class='catalog__h1']/span[@class='catalog__h1-span']`; 

class SearchResultsPage extends BasePage {
    constructor(driver, searchValue) {
        super(driver);
        this.searchValue = searchValue;
        this.searchedElementsXpath = `//div[@class='card__content']/div[@class='card__product-name']/a[contains(text(),'${this.searchValue}')]`;
    }

    async checkSearchResults() {
        return await this.findAllByXpath(this.searchedElementsXpath);
    }

    async getSelectText(){
        const element = await this.findByXpath(selectTextLocator);
        const elementText = await this.getItemText(element);
    
        return elementText;
     }
}

module.exports = SearchResultsPage;