var Firehash = require("../index");

describe("empty hash", function() {

  var hash = new Firehash();

  it("values() on empty hash returns []]", function() {
    expect(hash.values()).toEqual([]);
  });

});

describe("hash with one element", function() {

  var hash = new Firehash();
  hash.set("key");

  it("keys on {key:true} returns [true]", function() {
    expect(hash.values()).toEqual([true]);
  });

});
