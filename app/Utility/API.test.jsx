import * as API from './API.jsx';


test("Create account -pass",  (done) => {
    let data = {
        userName: "dailymotivation",
        email: "dailymotivation@motivate.com",
        phoneNumber: "4448889999"
    };
     API.createAccount(data, (results) =>{
        expect(results.data).toBe("Account was created");
        done();
    });

});

test("Create account -fail",  (done) => {
    let data = {
        userName: "dailymotivation",
        email: "dailymotivation@motivate.com",
        phoneNumber: "4448889999"
    };

    API.createAccount(data, (results) => {
        expect(results.data).toBe("Email or phone number is already registered");
        done();
    });
});


test("Delete account -pass" , (done) => {
    let data = {
        email: "dailymotivation@motivate.com",
        phoneNumber: "4448889999"
    };
   API.deleteAccount(data, (results) => {
       // console.log(resultsPass);
        expect(results.data).toBe("Account was deleted");
        done();
    });
});

test("Delete account - Fail" , (done) => {
    let data = {
        email: "dailymotivation@motivate.com",
        phoneNumber: "4448889999"
    };
    API.deleteAccount(data, (results) =>{
        // console.log(results);
        expect(results.data).toEqual("Please confirm email and phone number used for your account");
        done();
    });
});


test("Contact - Pass", (done) =>{
    let data = {
        email: "test@test.com",
        message: "Contact me test passed",
        option: "Testing"
    };
    API.contact(data, (results) => {
        expect(results.data).toEqual("Admin was contacted");
        done();
    })
});