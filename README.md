# Point of Sales

## Table of Contents

- [Introduction](#introduction)
- [Tools](#tools)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Copyright](#copyright)

---

## Introduction

**Point of Sales** is a simple project that contains:
- CRUD Products
- CRUD Categories
- Add/Reduce Products Stocks (quantities)
- Search Product by Name
- Sort Product by Name, Category, Date Updated
- Pagination
- Cannot Reduce Order Below 0 (-1, -5, etc)
- Allowed CORS
- Register/Login with JWT

---

## Tools

- [Node.js](https://nodejs.org)
- [XAMPP](https://www.apachefriends.org) (Use MySQL and phpMyAdmin for database)
- [Git Bash](https://git-scm.com)
- [Postman](https://www.apachefriends.org)
- [Visual Studio Code](https://www.apachefriends.org)

---

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

---

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

---

## Copyright

© [Jumaidil Fadillah](https://github.com/jumaidilfadil)