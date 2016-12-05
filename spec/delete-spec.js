var Firehash = require("../index");

var sampleObject = { foo: 1, bar: 2, blah: 3, yada: 4, hoot: 5, notset: null };

describe("delete()", function() {

  it("doesn't delete anything", function() {
    var sampleHash = new Firehash(sampleObject);
    sampleHash.delete();
    expect(sampleHash.get("foo")).not.toBeUndefined();
    expect(sampleHash.get("bar")).not.toBeUndefined();
    expect(sampleHash.get("blah")).not.toBeUndefined();
    expect(sampleHash.get("yada")).not.toBeUndefined();
    expect(sampleHash.get("hoot")).not.toBeUndefined();
  });

});

describe("delete(scalar)", function() {

  it("deletes a single value", function() {
    var sampleHash = new Firehash(sampleObject);
    sampleHash.delete("foo");
    expect(sampleHash.get("foo")).toBeUndefined();
    expect(sampleHash.get("bar")).not.toBeUndefined();
    expect(sampleHash.get("blah")).not.toBeUndefined();
    expect(sampleHash.get("yada")).not.toBeUndefined();
    expect(sampleHash.get("hoot")).not.toBeUndefined();
  });

});

describe("delete(array)", function() {

  it("deletes subset of values", function() {
    var sampleHash = new Firehash(sampleObject);
    sampleHash.delete(["foo","bar"]);
    expect(sampleHash.get("foo")).toBeUndefined();
    expect(sampleHash.get("bar")).toBeUndefined();
    expect(sampleHash.get("blah")).not.toBeUndefined();
    expect(sampleHash.get("yada")).not.toBeUndefined();
    expect(sampleHash.get("hoot")).not.toBeUndefined();
  });

});

describe("delete(object)", function() {

  it("deletes subset of values", function() {
    var sampleHash = new Firehash(sampleObject);
    sampleHash.delete({foo:true,bar:false});
    expect(sampleHash.get("foo")).toBeUndefined();
    expect(sampleHash.get("bar")).not.toBeUndefined();
    expect(sampleHash.get("blah")).not.toBeUndefined();
    expect(sampleHash.get("yada")).not.toBeUndefined();
    expect(sampleHash.get("hoot")).not.toBeUndefined();
  });

});
