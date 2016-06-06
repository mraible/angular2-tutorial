describe('Edit', () => {

  beforeEach(() => {
    browser.get('/');
    element(by.linkText('SEARCH')).click();
    let search = element(by.css('sd-search form input'));
    'Man'.split('').forEach((c) => search.sendKeys(c));
    element(by.css('sd-search form button')).click();
    element(by.linkText('Peyton Manning')).click();
  });

  let name = element(by.id('name'));
  let street = element(by.id('street'));
  let city = element(by.id('city'));

  it('should allow viewing a person', () => {
    expect(element(by.css('h3')).getText()).toEqual('Peyton Manning');
    expect(name.getAttribute('value')).toEqual('Peyton Manning');
    expect(street.getAttribute('value')).toEqual('1234 Main Street');
    expect(city.getAttribute('value')).toEqual('Greenwood Village');
  });

  it('should allow updating a name', function () {
    let save = element(by.id('save'));
    // send individual characters since sendKeys passes partial values sometimes
    // https://github.com/angular/protractor/issues/698
    ' Won!'.split('').forEach((c) => name.sendKeys(c));
    save.click();
    // verify one element matched this change
    var list = element.all(by.css('sd-search table tbody tr'));
    expect(list.count()).toBe(1);
  });
});
