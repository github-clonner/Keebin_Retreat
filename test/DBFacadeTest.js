/**
 * Created by kaspe on 02-05-2017.
 */

let expect = require("chai").expect;
let mocha = require("mocha");
let facade = require("../JS/Facade/DataBaseFacade");
let testUser;

let addTestUser = function ()
{
    return facade.createUser("test", "test", "testing@testing.test", 1, "09/09/2010", "male", "123", function (data)
    {
        if (data === false)
        {
            return "Error";
        }
        else
        {
            console.log("testUser lavet, her er den: " + data);
            testUser = data;
            return data;
        }
    });
};


let setupTest = function()
{
    addTestUser();
};


describe("Test of the most used User-related facade functions", function ()
{
    /////////////////////////////////////////////////////
    describe("Adds a new test user with the _createUser function of the Facade", function ()
    {
        it("Adds the user with email: testing@testing.test", function ()
        {
            addTestUser();
            expect(addTestUser()).to.equal();
        });
    });

    /////////////////////////////////////////////////////
    describe("GetUser test", function ()
    {
        it("Finds the user with email: tester@email.dk", function ()
        {
            facade.getUser("tester@email.dk", (data) =>
            {
                expect(data).to.equal(testUser);
            });
        });
    });

    describe("test of editUser", function ()
    {
        let editedUser =
            {
                firstName: "testerÆndret",
                lastName: "testerÆndret",
                email: "testing@testing.test",
                role: 1,
                birthday: "01/01/2010",
                sex: "female"
            };


        facade.putUser("123", "testing@testing.test", "testerÆndret", "testerÆndret", "nytester@email.test", 2, "01/01/2010", "female", "1234", function (data)
        {
            console.log("Edit user. Original usr: " + testUser + " og den nye: " + data);
            expect(data.firstName).to.equal("testerÆndret");
            expect(data.lastName).to.equal("testerÆndret");
            expect(data.email).to.equal("testing@testing.test");
            expect(data.role).to.equal(1);
            expect(data.birthday).to.equal("01/01/2010");
            expect(data.sex).to.equal("female");
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
