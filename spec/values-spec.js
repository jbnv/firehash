var Firehash = require("../index");

describe("values() on empty hash", function() {

  var hash = new Firehash();

  it("returns []]", function() {
    expect(hash.values()).toEqual([]);
  });

});

describe("values() on {key:true}", function() {

  var hash = new Firehash();
  hash.set("key");

  it("returns [true]", function() {
    expect(hash.values()).toEqual([true]);
  });

});
