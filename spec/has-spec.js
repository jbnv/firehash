var Firehash = require("../index");

var sampleObject = { foo: 1, bar: 2, blah: 3, yada: 4, hoot: 5, notset: null },
    sampleHash = new Firehash(sampleObject);

describe("has()", function() {

  it("returns true", function() {
    expect(sampleHash.has()).toEqual(true);
  });

});

describe("has(scalar)", function() {

  it("returns single value", function() {
    expect(sampleHash.has("foo")).toEqual(true);
    expect(sampleHash.has("yuck")).toEqual(false);
  });

});

describe("has(array)", function() {

  it("returns true only if it has all of the values", function() {
    expect(sampleHash.has([])).toEqual(true);
    expect(sampleHash.has(["foo"])).toEqual(true);
    expect(sampleHash.has(["yuck"])).toEqual(false);
    expect(sampleHash.has(["foo","bar"])).toEqual(true);
    expect(sampleHash.has(["foo","yuck"])).toEqual(false);
  });

});

describe("has(object)", function() {

  it("returns subset of values with default values set", function() {
    expect(sampleHash.has({})).toEqual(true);
    expect(sampleHash.has({foo:true})).toEqual(true);
    expect(sampleHash.has({yuck:true})).toEqual(false);
    expect(sampleHash.has({yuck:false})).toEqual(true);
    expect(sampleHash.has({foo:97,bar:98})).toEqual(true);
    expect(sampleHash.has({foo:97,yuck:98})).toEqual(false);
    expect(sampleHash.has({foo:97,yuck:false})).toEqual(true);
  });

});
