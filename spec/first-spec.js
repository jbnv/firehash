var Firehash = require("../index");

describe("'set' sets a data point", function() {

  var hash = new Firehash();
  hash.set("key","value");

  it("sets the 'key' value to 'value'", function() {
    expect(hash.__data.key).toBe("value");
  });

  it("returns 'value' for get('key')", function() {
    expect(hash.get("key")).toBe("value");
  });

});
