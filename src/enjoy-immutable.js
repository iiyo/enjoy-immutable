/* global require, enjoy, using, Immutable, window */

(function () {
    
    function enjoyImmutable (enjoy, Immutable) {
        
        var specialize = enjoy.specialize;
        var type = enjoy.type;
        var at = enjoy.at;
        var keys = enjoy.keys;
        var put = enjoy.put;
        var each = enjoy.each;
        var derive = enjoy.derive;
        
        var t_immutable = type();
        
        var t_immutable_map = type(Immutable.Map.isMap);
        var t_immutable_orderedMap = type(Immutable.OrderedMap.isOrderedMap);
        var t_immutable_list = type(Immutable.List.isList);
        var t_immutable_stack = type(Immutable.Stack.isStack);
        var t_immutable_set = type(Immutable.Set.isSet);
        var t_immutable_orderedSet = type(Immutable.OrderedSet.isOrderedSet);
        var t_immutable_record = type(Immutable.Record.isRecord);
        
        derive(t_immutable_map, t_immutable);
        derive(t_immutable_orderedMap, t_immutable);
        derive(t_immutable_list, t_immutable);
        derive(t_immutable_stack, t_immutable);
        derive(t_immutable_set, t_immutable);
        derive(t_immutable_orderedSet, t_immutable);
        derive(t_immutable_record, t_immutable);
        
        function immutable_at (collection, key) {
            return collection.get(key);
        }
        
        function immutable_put (collection, key, value) {
            return collection.set(key, value);
        }
        
        function immutable_keys (collection) {
            return collection.keys();
        }
        
        function immutable_each (collection, fn) {
            return collection.forEach(fn);
        }
        
        specialize(at, t_immutable, immutable_at);
        specialize(put, t_immutable, immutable_put);
        specialize(keys, t_immutable, immutable_keys);
        specialize(each, t_immutable, immutable_each);
        
        return Object.freeze({
            t_immutable: t_immutable,
            t_immutable_map: t_immutable_map,
            t_immutable_orderedMap: t_immutable_orderedMap,
            t_immutable_list: t_immutable_list,
            t_immutable_stack: t_immutable_stack,
            t_immutable_set: t_immutable_set,
            t_immutable_record: t_immutable_record,
            t_immutable_orderedSet: t_immutable_orderedSet
        });
    }
    
    if (typeof using === "function") {
        using("enjoy").define("enjoy-immutable", function (enjoy) {
            return enjoyImmutable(enjoy, Immutable);
        });
    }
    else if (typeof require === "function" && typeof module !== "undefined") {
        module.exports = enjoyImmutable(require("enjoy-js"), require("immutable"));
    }
    else if (typeof enjoy === "object") {
        window.enjoyImmutable = enjoyImmutable(enjoy, Immutable);
    }
    else {
        throw new Error("ENJOY.js not found.");
    }
    
}());
