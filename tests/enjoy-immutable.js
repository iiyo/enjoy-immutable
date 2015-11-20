/* global require, describe, it */

var assert = require("assert");
var enjoy = require("enjoy-js");
var Immutable = require("immutable");
var ei = require("../src/enjoy-immutable.js");

var at = enjoy.at;
var put = enjoy.put;
var keys = enjoy.keys;
var each = enjoy.each;
var isA = enjoy.isA;
var contains = enjoy.contains;

var t_immutable = ei.t_immutable;
var t_immutable_map = ei.t_immutable_map;
var t_immutable_orderedMap = ei.t_immutable_orderedMap;

describe("enjoy-immutable", function () {
    
    describe("isA(a, t)", function () {
        
        it("works with all Immutable collections", function () {
            
            var m = Immutable.Map();
            var om = Immutable.OrderedMap();
            var s = Immutable.Set();
            var os = Immutable.OrderedSet();
            var l = Immutable.List();
            var st = Immutable.Stack();
            var r = Immutable.Record({})({});
            
            assert(isA(m, t_immutable_map));
            assert(isA(m, t_immutable));
            
            assert(isA(om, t_immutable_orderedMap));
            assert(isA(om, t_immutable));
            
            assert(isA(s, ei.t_immutable_set));
            assert(isA(s, t_immutable));
            
            assert(isA(os, ei.t_immutable_orderedSet));
            assert(isA(os, t_immutable));
            
            assert(isA(l, ei.t_immutable_list));
            assert(isA(l, t_immutable));
            
            assert(isA(st, ei.t_immutable_stack));
            assert(isA(st, t_immutable));
            
            assert(isA(r, ei.t_immutable_record));
            assert(isA(r, t_immutable));
            
        });
        
    });
    
    describe("at(collection, key)", function () {
        
        it("works with Immutable.Map", function () {
            
            var c = Immutable.Map({a: 1, b: "foo", c: -3});
            
            assert.equal(at(c, "a"), 1);
            assert.equal(at(c, "b"), "foo");
            assert.equal(at(c, "c"), -3);
            
        });
        
        it("works with Immutable.OrderedMap", function () {
            
            var c = Immutable.OrderedMap({a: 1, b: "foo", c: -3});
            
            assert.equal(at(c, "a"), 1);
            assert.equal(at(c, "b"), "foo");
            assert.equal(at(c, "c"), -3);
            
        });
        
        it("works with Immutable.List", function () {
            
            var c = Immutable.List([1, "foo", -3]);
            
            assert.equal(at(c, 0), 1);
            assert.equal(at(c, 1), "foo");
            assert.equal(at(c, 2), -3);
            
        });
        
        it("works with Immutable.Record", function () {
            
            var p = Immutable.Record({a: 1, b: "foo", c: -3});
            var c = p({a: 1, b: "foo", c: -3});
            
            assert.equal(at(c, "a"), 1);
            assert.equal(at(c, "b"), "foo");
            assert.equal(at(c, "c"), -3);
            
        });
        
    });
    
    describe("each(collection, fn)", function () {
        
        it("works with Immutable.List", function () {
            
            var v = [1, "foo", -3];
            var c = Immutable.List(v);
            
            each(c, function (val, i) {
                assert.equal(val, v[i]);
            });
        });
        
        it("works with Immutable.Map", function () {
            
            var v = {a: 1, b: "foo", c: -3};
            var c = Immutable.Map(v);
            
            each(c, function (val, i) {
                assert.equal(val, v[i]);
            });
        });
        
    });
    
    describe("contains(collection, key)", function () {
        
        it("works with Immutable.Set", function () {
            
            var c = Immutable.Set([1, "foo", -3]);
            
            assert(contains(c, 1));
            assert(contains(c, "foo"));
            assert(contains(c, -3));
            
            [null, undefined, "bar", {}, [], -20, 0, 4].forEach(function (v) {
                assert(contains(c, v) === false);
            });
        });
        
    });
    
});
