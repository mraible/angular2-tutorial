describe('Search', () => {

  beforeEach(() => {
    browser.get('/');
    element(by.linkText('SEARCH')).click();
  });

  it('should have an input and search button', () => {
    expect(element(by.css('sd-app sd-search form input')).isPresent()).toEqual(true);
    expect(element(by.css('sd-app sd-search form button')).isPresent()).toEqual(true);
  });

  it('should allow searching', () => {
    let searchButton = element(by.css('button'));
    let searchBox = element(by.css('input'));
    searchBox.sendKeys('M');
    searchButton.click().then(() => {
      // doesn't work as expected - results in 0
      //expect(element.all(by.repeater('person of searchResults')).count()).toEqual(3);
      var list = element.all(by.css('sd-search table tbody tr'));
      expect(list.count()).toBe(3);
    });
  });
});
