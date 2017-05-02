/**
 * Created by kaspe on 02-05-2017.
 */

let expect = require("chai").expect;
let mocha = require("mocha");
let facade = require("../JS/Facade/DataBaseFacade");

describe("Test of the most used facade functions", function ()
{
    /////////////////////////////////////////////////////
    describe("Adds a new test user with the _createUser function of the Facade", function ()
    {
        it("Finds the user with email: tester@email.dk", function ()
        {
            facade.getUser("tester@email.dk", (data)=>
            {
                console.log(data);
            });

            // var redHex = converter.rgbToHex(255, 0, 0);
            // var greenHex = converter.rgbToHex(0, 255, 0);
            // var blueHex = converter.rgbToHex(0, 0, 255);
            //
            // expect(redHex).to.equal("ff0000");
            // expect(greenHex).to.equal("00ff00");
            // expect(blueHex).to.equal("0000ff");
        });
    });

    /////////////////////////////////////////////////////
    describe("GetUser test", function ()
    {
        it("Finds the user with email: tester@email.dk", function ()
        {
            facade.getUser("tester@email.dk", (data)=>
            {
                console.log(data);
            });

            // var redHex = converter.rgbToHex(255, 0, 0);
            // var greenHex = converter.rgbToHex(0, 255, 0);
            // var blueHex = converter.rgbToHex(0, 0, 255);
            //
            // expect(redHex).to.equal("ff0000");
            // expect(greenHex).to.equal("00ff00");
            // expect(blueHex).to.equal("0000ff");
        });
    });
/////////////////////////////////////////////////////
//     describe("Hex to RGB conversion", function ()
//     {
//         it("converts the basic colors", function ()
//         {
//             var red = converter.hexToRgb("ff0000");
//             var green = converter.hexToRgb("00ff00");
//             var blue = converter.hexToRgb("0000ff");
//
//             expect(red).to.deep.equal([255, 0, 0]);
//             expect(green).to.deep.equal([0, 255, 0]);
//             expect(blue).to.deep.equal([0, 0, 255]);
//         });
//     });
/////////////////////////////////////////////////////


/////////////////////////////////////////////////////


/////////////////////////////////////////////////////
});
