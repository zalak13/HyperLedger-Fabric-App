import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for marketplace-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be marketplace-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('marketplace-app');
    })
  });

  it('navbar-brand should be marketplace@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('marketplace@0.0.1');
  });

  
    it('Article component should be loadable',() => {
      page.navigateTo('/Article');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Article');
    });

    it('Article table should have 6 columns',() => {
      page.navigateTo('/Article');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  

});
