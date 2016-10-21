var Firehash = require("../index");

describe("keys() on empty hash", function() {

  var hash = new Firehash();

  it("returns []]", function() {
    expect(hash.keys()).toEqual([]);
  });

});

describe("keys() on {key:true}", function() {

  var hash = new Firehash();
  hash.set("key");

  it("returns ['key']", function() {
    expect(hash.keys()).toEqual(["key"]);
  });

});
