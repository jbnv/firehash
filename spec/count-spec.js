var Firehash = require("../index");

describe("empty hash", function() {

  var hash = new Firehash();

  it("count on empty hash returns 0", function() {
    expect(hash.count()).toEqual(0);
  });

});

describe("hash with one element", function() {

  var hash = new Firehash();
  hash.set("key");

  it("count on hash with one element returns 1", function() {
    expect(hash.count()).toEqual(1);
  });

});
