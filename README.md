
Installation
Make sure you have NodeJS and npm installed.

Start Server and React:
To run the Frontend npm install && npm start on your terminal from the project root folder.
To run the backend project type cd backend npm install && npm start on your terminal from the project root folder.

Store APIs
http://localhost:5000/products - To fetch all the products available on in-memory store
http://localhost:5000/orders - To push the cart data into the in-memory store

Discount
The discount is applied every 3rd order. you can configure it on config.env
If the discount is not applied, there will be a custom message( Better luck next time )

Admin APIs
http://localhost:5000/admin/discount - To Generate a discount code if the condition above is satisfied
http://localhost:5000/admin/stats - Lists count of items purchased, total purchase amount, list of discount codes and total discount amount

StateManagement: Context API + reducer / Context API + state / custom Http Hooks (More info on them in read-me.txt on their designated folders )

Util folder: 
CatchAsync: a function an utility function that wraps all the route handlers and provide the catch methods
AppError: a class that extends the Error to provide an isOperational error to all the operational errors so we can  handle errors more efficiently

