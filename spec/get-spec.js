var Firehash = require("../index");

var sampleObject = { foo: 1, bar: 2, blah: 3, yada: 4, hoot: 5, notset: null },
    sampleHash = new Firehash(sampleObject);

describe("get()", function() {

  it("returns whole object", function() {
    var gotten = sampleHash.get();
    expect(gotten.foo).toEqual(1);
    expect(gotten.bar).toEqual(2);
    expect(gotten.blah).toEqual(3);
    expect(gotten.yada).toEqual(4);
    expect(gotten.hoot).toEqual(5);
    expect(gotten.notset).toEqual(true); // sets null values to true
  });

});

describe("get(scalar)", function() {

  it("returns single value", function() {
    expect(sampleHash.get("foo")).toEqual(1);
  });

});

describe("get(array)", function() {

  it("returns subset of values", function() {
    var gotten = sampleHash.get(["foo","bar"]);
    expect(gotten.foo).toEqual(1);
    expect(gotten.bar).toEqual(2);
    expect(gotten.blah).toBeUndefined();
    expect(gotten.yada).toBeUndefined();
    expect(gotten.hoot).toBeUndefined();
    expect(gotten.notset).toBeUndefined();
  });

});

describe("get(object)", function() {

  it("returns subset of values with default values set", function() {
    var gotten = sampleHash.get({foo:97,notset:98,brandnew:99});
    expect(gotten.foo).toEqual(1);
    expect(gotten.bar).toBeUndefined();
    expect(gotten.blah).toBeUndefined();
    expect(gotten.yada).toBeUndefined();
    expect(gotten.hoot).toBeUndefined();
    expect(gotten.notset).toEqual(true);
    expect(gotten.brandnew).toEqual(99);
  });

});
