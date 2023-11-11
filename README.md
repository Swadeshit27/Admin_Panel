# Admin panel

This project is basically a simple authentication system API using node js, Express js, and Mongodb incorporating Json Web Token for user authentication. The system will have two types of users -

1. Admin
2. Normal user

Admin can register themselves, while normal users cannot register directly. Instead, they can only be added by an authenticated admin.

* To test this application you need postman

## Tech tools & NPM Packages

1. Node js
2. Express js
3. Mongodb
4. Json Web Token
5. Bcrypt

## Procedure

## Admin Registration

<h4> Endpoints </h4>
URL:

```bash
      http://localhost:6001/api/admin/register
```

Method : POST

1. Username (string)
2. Email (string)
3. Password (string)

### Example

```bash
   {
    "Email":"abcd@gmail.com",
    "Password":"Abcd@123",
    "Username":"Abcd12"
  }
```

## Admin Login

<h4> Endpoints </h4>
URL:

```bash
    http://localhost:6001/api/admin/login
```

Method : POST

1. Username (string)
2. Password (string)

### Example

```bash
   {
    "Username":"Abcd12"
    "Password":"Abcd@123",
  }
```

### Response 

```bash
    {
        "message": "admin login successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGY3YzEzMGVjNGIzZDEyOTlkNDA4OCIsImlhdCI6MTY5OTcwODE1MH0.MDI_COak7Nt2nmztBsD79HqJFpSK-qTAwCgv0YxRp-E",
        "success": true
    }
```

**After successful login you will receive a token as a response and this token will be needed while adding the normal users because using this token server will check if the admin is valid or not.**

## Add normal user

<h4> Endpoints </h4>
URL:

```bash
    http://localhost:6001/api/admin/add-user
```

Method : POST

1. Username (string)
2. Email (string)
3. Password (string)
4. Authorization: Bearer [token] (which is generated at the time of admin's login)

## Display all users

<h4> Endpoints </h4>
URL:

```bash
    http://localhost:6001/api/admin/all-users
```

Method : GET

1. Authorization: Bearer [token] (which is generated at the time of admin's login)
