const { Builder, Capabilities, By } = require("selenium-webdriver");

require('chromedriver');

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
    await (await driver).get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await (await driver).quit()
})

test('movies are crossed off the list', async () => {
    await driver.findElement(By.xpath('//input[@placeholder="Add Movie"]')).sendKeys('FernGully');
    await driver.findElement(By.xpath('//button[text()="Add"]')).click();
    await driver.findElement(By.xpath('//span[text()="FernGully"]')).click();

    const crossed = driver.findElement(By.xpath('//span[@class="checked"]'))

    const isCrossed = crossed.isDisplayed()
    expect(isCrossed).toBeTruthy()

    await driver.sleep(2000)
})

test('messages are being displayed', async () => {
    await driver.findElement(By.xpath('//input[@placeholder="Add Movie"]')).clear();
    await driver.findElement(By.xpath('//input[@placeholder="Add Movie"]')).sendKeys('The Black Cauldron');
    await driver.findElement(By.xpath('//button[text()="Add"]')).click();
    await driver.findElement(By.xpath('//span[text()="The Black Cauldron"]')).click();

    const message = driver.findElement(By.xpath("//aside[text()='The Black Cauldron watched!']"));

    const crossedMessage = message.isDisplayed();
    expect(crossedMessage).toBeTruthy()

    await driver.sleep(2000)
})

test('move is deleted', async () => {
    await driver.findElement(By.xpath('//button[@id="TheBlackCauldron"]')).click();

    const deleted = driver.findElement(By.xpath("//aside[text()='The Black Cauldron deleted!']"));

    const isDeleted = deleted.isDisplayed();
    expect(isDeleted).toBeTruthy();

    await driver.sleep(2000)
})