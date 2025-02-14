# EXPENSE TRACKER API

## Steps to run the Project

1. import or clone the git repo into your pc `git clone https://github.com/dganesh22/expense-tracker-api.git`

2. install the packages using `npm i --save --force`

3. update the environment file variables
PORT 
PORT=3500

 mode development or production
MODE=development

 dev mongo
DEV_MONGO = mongodb://127.0.0.1:27017/dbexpense

 prod mongo
PROD_MONGO=

 secret key
APP_SECRET_KEY=

4. Run the development server `npm run dev` or production server by `npm run dev`


# API Paths

## Authentication api path

1. for register 
   http POST request  - `https://your_domain_name.com/api/auth/register`

2. for login 
	http POST request - `https://your_domain_name.com/api/auth/login`

3. for logout 
	http GET request - `https://your_domain_name.com/api/auth/logout`

4. for verify 
	http GET request - `https://your_domain_name.com/api/auth/verify`


## Expense tracker api path

1. for adding transaction
	http POST request  - `https://your_domain_name.com/api/transaction/add`

2. for reading all transactions
	http GET request  - `https://your_domain_name.com/api/transaction/all`

3. for reading single transaction
	http GET request  - `https://your_domain_name.com/api/transaction/single/:id`

4. to update single transaction
	http PATCH request  - `https://your_domain_name.com/api/transaction/update/:id`

5. to delete single transaction
	http DELETE request  - `https://your_domain_name.com/api/transaction/delete/:id`