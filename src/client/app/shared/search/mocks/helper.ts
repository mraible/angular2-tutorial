import {DebugElement} from '@angular/core/src/debug/debug_node';
import {Response, ResponseOptions} from '@angular/http';
import {By} from '@angular/platform-browser/src/dom/debug/by';
import {StringMapWrapper} from '@angular/core/src/facade/collection';

class MockResponse extends Response {
  _json: any;

  constructor(json: any) {
    super(new ResponseOptions());
    this._json = json;
  }

  json() {
    return this._json;
  }
}

export class TestHelper {
  /** Gets a child DebugElement by tag name. */
  static getChildByTagName(parent: DebugElement, tagName: string): DebugElement {
    return parent.query(debugEl => debugEl.nativeElement.tagName.toLowerCase() == tagName);
  }

  /**
   * Gets a child DebugElement by css selector.
   *
   * The child of DebugElement are other elements that are "known" to
   * Angular.
   */
  static getChildrenBySelector(parent: DebugElement, selector: string): DebugElement[] {
    let results = [];

    parent.queryAll(By.css(selector)).forEach((el) => results.push(el));
    parent.children.forEach((de) => {
      TestHelper.getChildrenBySelector(de, selector).forEach((el) => results.push(el));
    });

    return results;
  }

  static isPhantomJS(): boolean {
    return navigator && navigator.userAgent
      && navigator.userAgent.indexOf('PhantomJS') > -1;
  }

  static mockJSONResponse(payload: any) {
    return new MockResponse(payload);
  }
}

export interface GuinessCompatibleSpy extends jasmine.Spy {
  /** By chaining the spy with and.returnValue, all calls to the function will return a specific
   * value. */
  andReturn(val: any): void;
  /** By chaining the spy with and.callFake, all calls to the spy will delegate to the supplied
   * function. */
  andCallFake(fn: Function): GuinessCompatibleSpy;
  /** removes all recorded calls */
  reset();
}

export class SpyObject {
  constructor(type = null) {
    if (type) {
      for (var prop in type.prototype) {
        var m = null;
        try {
          m = type.prototype[prop];
        } catch (e) {
          // As we are creating spys for abstract classes,
          // these classes might have getters that throw when they are accessed.
          // As we are only auto creating spys for methods, this
          // should not matter.
        }
        if (typeof m === 'function') {
          this.spy(prop);
        }
      }
    }
  }
  // Noop so that SpyObject has the same interface as in Dart
  noSuchMethod(args) {}

  spy(name) {
    if (!this[name]) {
      this[name] = this._createGuinnessCompatibleSpy(name);
    }
    return this[name];
  }

  prop(name, value) { this[name] = value; }

  static stub(object = null, config = null, overrides = null) {
    if (!(object instanceof SpyObject)) {
      overrides = config;
      config = object;
      object = new SpyObject();
    }

    var m = StringMapWrapper.merge(config, overrides);
    StringMapWrapper.forEach(m, (value, key) => { object.spy(key).andReturn(value); });
    return object;
  }

  /** @internal */
  _createGuinnessCompatibleSpy(name): GuinessCompatibleSpy {
    var newSpy: GuinessCompatibleSpy = <any>jasmine.createSpy(name);
    newSpy.andCallFake = <any>newSpy.and.callFake;
    newSpy.andReturn = <any>newSpy.and.returnValue;
    newSpy.reset = <any>newSpy.calls.reset;
    // revisit return null here (previously needed for rtts_assert).
    newSpy.and.returnValue(null);
    return newSpy;
  }
}
