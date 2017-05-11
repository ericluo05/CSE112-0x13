Types of Tests
1. Unit Test 
    I. Command - "gulp mocha:unit"
2. Routing Test 
    I. Command - "gulp mocha:route"
    II. Only check for access to static pages are successful 
        (such as homepage, login page)
3. API Test 
    I. Command - "gulp mocha:api"
    
    Routing and API Test both uses supertest - https://github.com/visionmedia/supertest
    ** 
4. End-to-End (e2e) 
    I. Not yet integrated to gulp
    II. Commands: "npm run <e2e_chrome | e2e_firefox | e2e_ff | e2e_edge
        | e2e_safari | e2e_windows | e2e_mac >"
    III. e2e_mac will run chrome + firefox tests, 
         e2e_windows will run chrome + firefox + edge tests
    IV. Uses Nightwatch  -  http://nightwatchjs.org/api

