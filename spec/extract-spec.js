var Firehash = require("../index");

var collection = {
  tic: {blah:"foo",yada:"qwerty"},
  tac: {blah:"foo",hoot:"asdf"},
  toe: {blah:"bar",burp:"zxcv"},
  tug: {hoot:"12345"}
}

describe("extract()", function() {

  var hash = new Firehash();
  hash.extract("blah",collection);

  it("pulls out an object with keys 'foo','bar'", function() {
    expect(hash.keys()).toEqual(['foo','bar']);
  });

  it("has a 'foo' value", function() {
    expect(Object.keys(hash.get("foo"))).toEqual(["tic","tac"]);
  });

  it("has a 'bar' value", function() {
    expect(Object.keys(hash.get("bar"))).toEqual(["toe"]);
  });

});

describe("extract() reducing to true-arrays", function() {

  var hash = new Firehash();
  hash.extract("blah",collection,function(x) { return true });

  it("produces the expected transform", function() {
    expect(hash.get("foo")).toEqual({ tic: true, tac: true });
    expect(hash.get("bar")).toEqual({ toe: true });
  });

});
