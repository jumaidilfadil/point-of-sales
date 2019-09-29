# Point of Sales

## Table of Contents

- [Introduction](#introduction)
- [Tools](#tools)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Route Usage](#route-usage)
- [License](#license)

## Introduction

**Point of Sales** is a simple RESTful API project that contains:
- CRUD Products
- CRUD Categories
- Add/Reduce Products Stocks (Quantities)
- Search Product by Name
- Sort Product by Name, Category, Date Updated
- Pagination
- Cannot Reduce Stocks Below 0 (-1, -5, etc)
- Allowed CORS
- Register and Login with JWT

## Tools

- [Node.js](https://nodejs.org)
- [XAMPP](https://www.apachefriends.org) (Use MySQL and phpMyAdmin for database)
- [Git Bash](https://git-scm.com)
- [Postman](https://www.apachefriends.org)
- [Visual Studio Code](https://www.apachefriends.org)

## Dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cors](https://www.npmjs.com/package/cors)
- [dateformat](https://www.npmjs.com/package/dateformat)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-fileupload](https://www.npmjs.com/package/express-fileupload)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [morgan](https://www.npmjs.com/package/morgan)
- [mysql](https://www.npmjs.com/package/mysql)

## Installation

### Clone and Install
```bash
$ git clone https://github.com/jumaidilfadil/point-of-sales.git
$ cd point-of-sales
$ npm install
```

<br>

### Create Environment Variable
```bash
$ cp .env.example .env
$ nano .env
```
Or you can edit .env with your code editor.
<br><br>

### Start Development Server
```bash
$ npm start
```

## Route Usage

**NOTE:**  
Fill in your own {{base_site}}  
Example:  
{{base_site}} = http://localhost:3000

**\* Required**  

Usability | Method | URL | Req. Query Params | Req. Body
--- | --- | --- | --- | ---
User Register | POST | {{base_site}}/user/register | - | *username<br>*password
User Login | POST | {{base_site}}/user/login | - | *username<br>*password
Product Show | GET | {{base_site}}/api/v1/product | search<br>sort<br>order<br>page<br>limit | -
Product Add | POST | {{base_site}}/api/v1/product | - | *name<br>description<br>image<br>*id_category<br>*price<br>*stock
Product Edit | PATCH | {{base_site}}/api/v1/product/:id | - | *name<br>description<br>image<br>*id_category<br>*price<br>*stock
Product Delete | DELETE | {{base_site}}/api/v1/product/:id | - | -
Product Add Stock | PUT | {{base_site}}/api/v1/product/stock/add/:id | - | -
Product Reduce Stock | PUT | {{base_site}}/api/v1/product/stock/reduce/:id | - | -
Category Show | GET | {{base_site}}/api/v1/category | - | -
Category Add | POST | {{base_site}}/api/v1/category | - | *name
Category Edit | PUT | {{base_site}}/api/v1/category/:id | - | *name
Category Delete | DELETE | {{base_site}}/api/v1/category/:id | - | -

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.  
Copyright &copy; [Jumaidil Fadillah](https://github.com/jumaidilfadil)