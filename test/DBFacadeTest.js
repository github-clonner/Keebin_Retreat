/**
 * Created by kaspe on 02-05-2017.
 */
let expect = require("chai").expect;
let mocha = require("mocha");
let facade = require("../JS/Facade/DataBaseFacade");
let bcrypt = require("bcryptjs");


describe("Tests the most commonly used user related DB facade functions (essentially just CRUD)", function ()
{
    var salt = bcrypt.genSaltSync(12);
    let testUser =
        {
            firstName: "test",
            lastName: "test",
            email: "testing@testing.test",
            role: 1,
            birthday: "09/09/2010",
            sex: "male",
            password: bcrypt.hashSync("123", salt)
        };
    describe("Tests the createUser function", function ()
    {
        it("creates the user, and returns true", function (done)
        {
            facade.createUser(testUser.firstName, testUser.lastName, testUser.email, testUser.role, testUser.birthday, testUser.sex, testUser.password, function (data)
            {
                expect(data).to.equal(true);
                done();
            });
        });
    });
    describe("Tests the getUser function", function ()
    {
        it("Finds the user with the email: testing@testing.test, and returns it", function (done)
        {
            facade.getUser("testing@testing.test", function (data)
            {
                expect(data.dataValues.firstName).to.equal(testUser.firstName);
                expect(data.dataValues.lastName).to.equal(testUser.lastName);
                expect(data.dataValues.email).to.equal(testUser.email);
                expect(data.dataValues.roleId).to.equal(testUser.role);
                expect(data.dataValues.sex).to.equal(testUser.sex);
                done();
            });
        });
    });
    describe("Tests the putUser (edit) function", function ()
    {
        it("Finds the user with the email: testing@testing.test, and updates it with new data", function (done)
        {
            facade.putUser("123", "testing@testing.test", "testerÆndret", "testerÆndret", "nytester@email.test", 1, "01/01/2010", "female", "1234", function (data)
            {
                let editedUser = data.dataValues;
                expect(editedUser.firstName).to.equal("testerÆndret");
                expect(editedUser.lastName).to.equal("testerÆndret");
                expect(editedUser.email).to.equal("nytester@email.test");
                expect(editedUser.roleId).to.equal(1);
                expect(editedUser.sex).to.equal("female");
                done();
            });
        });
    });
    describe("Tests the deleteUser function", function ()
    {
        it("Finds and deletes the user", function (done)
        {
            facade.deleteUser("nytester@email.test", function (data)
            {
                expect(data).to.equal(true);
                done();
            });

        });
    });
});


