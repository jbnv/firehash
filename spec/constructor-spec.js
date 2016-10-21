var Firehash = require("../index");

describe("constructor sets data given", function() {

  var hash = new Firehash({key:"value"},"test hash");

  it("sets the 'key' value to 'value'", function() {
    expect(hash.get("key")).toEqual("value");
  });

  it("sets the name of the hash to 'test hash'", function() {
    expect(hash.name()).toEqual("test hash");
  });

});
