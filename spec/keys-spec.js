var Firehash = require("../index");

describe("empty hash", function() {

  var hash = new Firehash();

  it("keys() on empty hash returns []]", function() {
    expect(hash.keys()).toEqual([]);
  });

});

describe("hash with one element", function() {

  var hash = new Firehash();
  hash.set("key");

  it("keys on {key:true} returns ['key']", function() {
    expect(hash.keys()).toEqual(["key"]);
  });

});
