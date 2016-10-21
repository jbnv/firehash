var Firehash = require("../index");

describe("set(scalar,any)", function() {

  var hash = new Firehash();
  hash.set("key","value");

  it("sets the data point", function() {
    expect(hash.get("key")).toEqual("value");
  });

});

describe("set(scalar) without value", function() {

  var hash = new Firehash();
  hash.set("key");

  it("sets value to true", function() {
    expect(hash.get("key")).toEqual(true);
  });

});

describe("set(array,value)", function() {

  var hash = new Firehash();
  hash.set(["key1","key2"],"value");

  it("returns 'value' for get('key1')", function() {
    expect(hash.get("key1")).toEqual("value");
  });

  it("returns 'value' for get('key2')", function() {
    expect(hash.get("key2")).toEqual("value");
  });

});

describe("set(array) with no value", function() {

  var hash = new Firehash();
  hash.set(["key1","key2"]);

  it("returns true for get('key1')", function() {
    expect(hash.get("key1")).toEqual(true);
  });

  it("returns true for get('key2')", function() {
    expect(hash.get("key2")).toEqual(true);
  });

});

describe("set(object,value)", function() {

  var hash = new Firehash();
  hash.set({key1:"foo",key2:"bar"},"value");

  it("returns 'value' for get('key1')", function() {
    expect(hash.get("key1")).toEqual("foo");
  });

  it("returns 'value' for get('key2')", function() {
    expect(hash.get("key2")).toEqual("bar");
  });

});

describe("set(object,value) with object with missing data values", function() {

  var hash = new Firehash();
  hash.set({foo:"foo",bar:null},"bar");

  it("returns 'value' for get('key1')", function() {
    expect(hash.get("foo")).toEqual("foo");
  });

  it("returns 'value' for get('key2')", function() {
    expect(hash.get("bar")).toEqual("bar");
  });

});

describe("set(function,value)", function() {

  var hash = new Firehash();
  hash.set(function(value) { this.key = value; }, "foo");

  it("returns 'foo' for get('key')", function() {
    expect(hash.get("key")).toEqual("foo");
  });

});
