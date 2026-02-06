"use strict";

const Ancestors = require("../../ext/helpers/ancestors.js");
const build_two_layer_dom = require("../factory.html.js");


describe("#constructor", () => {
    describe("type validations", () => {
        test("ensures nodeOne will be nulled if not passed an Element", () => {
            expect(new Ancestors("", document.createElement("div")).nodeOne).toBeNull();
        });

        test("ensures nodeTwo will be nulled if not passed an Element", () => {
            expect(new Ancestors(document.createElement("div"), "").nodeTwo).toBeNull();
        });

        test("ensures nodeOne contains the original element", () => {
            build_two_layer_dom();
            const node = document.getElementById("child-0");
            expect(new Ancestors(node, "").nodeOne).toEqual(node);
        });

        test("ensures nodeTwo contains the original element", () => {
            build_two_layer_dom();
            const node = document.getElementById("child-1");
            expect(new Ancestors("", node).nodeTwo).toEqual(node);
        });
    });
});
