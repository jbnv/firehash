var Firehash = require("../index");

describe("push(scalar,scalar,any)", function() {

  var hash = new Firehash();
  hash.push("list","key1","boo");
  hash.push("list","key2","foo");
  hash.push("list","key3","bar");

  it("sets the data point", function() {
    expect(hash.get("list")).toEqual({"key1":"boo","key2":"foo","key3":"bar"});
  });

});
