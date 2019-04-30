
This is a simple transaction-mocking application

It consists from 2 parts:
1) back-end (folder Transaction_back). Based on Express.js, includes all npm packages necessary to work (already installed). App has no DB-service and all the data are stored in memory
2) front-end (folder Transaction_front)

In order to test it:

1) launch back-end service:
    - go to Transaction_back and run "npm start": nodemon runs app in semi-automatic mode and restarts it if any adjustments to the code have been detected
2) open file index.html, located in Transaction_front in browser
3) in the page appeared in browser try to enter different numbers and to add credit and debit transactions. Front-end part sends requests to the back-end part (see script.js). Back-end part receives and process the commands and after that fron-end updates list of transactions and general account amount. 

API of back-end part of application can be seen in the router file "\Transaction_back\routes\transactions_routes.js"



Nothes from the author:

- Application in utterly simple and has no protection whatsoever. Error-handling is pretty rudimentary. Custom error-throwing is implemented only in the processing logic for credit transactions
- I have never worked neither with Vue.js nor with Bootstrap, so these tools received only limited use and perhaps were applied quite awkwardly
- Some npm packages probably are abundant and its back-end logic and structure perhaps slightly more complicated than they needed to be for such a simple application