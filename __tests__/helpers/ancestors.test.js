"use strict";

const Ancestors = require("../../ext/helpers/ancestors.js");
const build_n_layer_dom = require("../factory.html.js");


describe("#constructor", () => {
    describe("type validations", () => {
        test("ensures nodeOne will be nulled if not passed an Element", () => {
            expect(new Ancestors("", document.createElement("div")).nodeOne).toBeNull();
        });

        test("ensures nodeTwo will be nulled if not passed an Element", () => {
            expect(new Ancestors(document.createElement("div"), "").nodeTwo).toBeNull();
        });

        test("ensures nodeOne contains the original element", () => {
            build_n_layer_dom(2);
            const node = document.getElementById("child-0");
            expect(new Ancestors(node, "").nodeOne).toEqual(node);
        });

        test("ensures nodeTwo contains the original element", () => {
            build_n_layer_dom(2);
            const node = document.getElementById("child-1");
            expect(new Ancestors("", node).nodeTwo).toEqual(node);
        });
    });
});


describe("#ancestorNodes", () => {
    describe("when the class is improperly called", () => {
        let ancestorTree;

        beforeEach(() => {
            ancestorTree = new Ancestors("", "")
        });
        
        test("throws a TypeError when nodeOne is null", () => {
            expect(ancestorTree.nodeOneAncestors).toThrowError("null was not of type Element");
        });
        
        test("throws a TypeError when nodeTwo is null", () => {
            expect(ancestorTree.nodeTwoAncestors).toThrowError(TypeError);
        });
    });
    
    describe("when neither node has ancestors", () => {
        let ancestorTree;

        beforeEach(() => {
            ancestorTree = new Ancestors(document.createElement("div"), document.createElement("div"))
        });

        test("ensures nodeOne does not return nodes", () => {
            expect(ancestorTree.nodeOneAncestors).toEqual([])
        });

        test("ensures nodeOne does not return nodes", () => {
            expect(ancestorTree.nodeTwoAncestors).toEqual([])
        });
    });

    describe("when nodeOne has ancestors", () => {
        let ancestorTree;

        beforeEach(() => {
            build_n_layer_dom(5);
            ancestorTree = new Ancestors(document.getElementById("child-4"), document.createElement("div"));
        });

        test("ensures array is returned", () => {
            expect(ancestorTree.nodeOneAncestors).toBeInstanceOf(Array);
        });

        test("ensures array items are elements", () => {
            expect(ancestorTree.nodeOneAncestors[0]).toBeInstanceOf(Element);
        });

        test("ensures return is limited to Ancestors.depth", () => {
            expect(ancestorTree.nodeOneAncestors.length).toBe(3);
        });
    });

    describe("when nodeTwo has ancestors", () => {

    });
    describe("when both nodes have ancestors", () => {

    });
});
