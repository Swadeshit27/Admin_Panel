# Admin panel

## Overview

This project is basically a simple authentication system API using node js, Express js, and Mongodb incorporating Json Web Token for user authentication. The system will have two types of users -

1. Admin 
1. Normal user

Admin can register themselves, while normal users cannot register directly. Instead, they can only be added by an authenticated admin.

> [!NOTE]
>
> 1. To test this application you need postman.
> 1. Also this project is deployed on render so you don't need to fork and clone. To check this project, you can follow this following steps.

## Tech tools & NPM Packages

| Ser. no | Tools          |
| ------: | -------------- |
|       1 | Node js        |
|       2 | Express js     |
|       3 | Mongodb        |
|       4 | Json Web Token |
|       5 | Bcrypt         |
|       6 | validator         |


# Procedure

## Admin Registration

<h4> Endpoints </h4>
URL:

```bash
      https://admin-panel-bi8j.onrender.com/api/admin/register
```

Method : ``POST``
<h3> Provide the following details</h3> 

` 1. Username (string),
  2. Email (string),
  3. Password (string)`

> [!IMPORTANT]
>
>  1. Username and Email should be unique else throw error.
>  1. Username must be at least 6 and at most 12 characters.
>  1. Enter proper email as it's validated else throw error.

### Example

```bash
   {
    "Email":"abcd@gmail.com",
    "Password":"Abcd@123",
    "Username":"Abcd12"
  }
```

### Success Response

```bash
    {
        "message": "Admin registered successfully",
        "success": true
    }
```
### Error Responses

```bash
    {
        "message": "Email already exists",
        "success": false
    }
```

```bash
    {
        "message": "Username already exists",
        "success": false
    }
```
```bash
    {
        "message": "Admin already exists",
        "success": false
    }
```

## Admin Login

<h4> Endpoints </h4>
URL:

```bash
    https://admin-panel-bi8j.onrender.com/api/admin/login
```

Method : ``POST``
 
<h3> Provide the following details</h3> 

` 1. Username (string),
  3. Password (string)`

> [!IMPORTANT]
>
>  1. Username  should be unique .
>  1. Username must be at least 6 and at most 12 characters.
>  1.  After successful login you will receive a token as a response and this token will be needed while adding the normal users because using this token server will check if the admin is valid or not


### Example

```bash
   {
    "Username":"Abcd12"
    "Password":"Abcd@123",
  }
```

### Success Response

```bash
    {
        "message": "admin login successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGY3YzEzMGVjNGIzZDEyOTlkNDA4OCIsImlhdCI6MTY5OTcwODE1MH0.MDI_COak7Nt2nmztBsD79HqJFpSK-qTAwCgv0YxRp-E",
        "success": true
    }
```

### Error Responses

```bash
    {
        "message": "Admin doesn't exists",
        "success": false
    }
```
```bash
    {
        "message": "Invalid credential",
        "success": false
    }
```


## Add normal user

<h4> Endpoints </h4>
URL:

```bash
    https://admin-panel-bi8j.onrender.com/api/admin/add-user
```

Method : ``POST``

<h3> Provide the following details</h5> 

` 1. Username (string),
  2. Email (string),
  3. Password (string)
  4. Authorization: Bearer [token] (which is generated at the time of admin's login)`

> [!IMPORTANT]
>
>  1. Username and Email should be unique else throw error.
>  1. Username must be at least 6 and at most 12 characters.
>  1. Enter proper email as it's validated else throw error.
>  1. Also make sure that a admin can't register himself/herself as a normal user.

### Example

```bash
   {
    "Email":"user@gmail.com",
    "Username":"user112",
    "Password":"User@123"
  }
```

### Success Response

```bash
    {
        "message": "user added successfully",
        "success": true
    }
```

### Error Responses

```bash
    {
        "message": "unauthorized admin",
        "success": false
    }
```
```bash
    {
        "message": "Email already exists",
        "success": false
    }
```
```bash
    {
        "message": "Username already exists",
        "success": false
    }
```
```bash
    {
        "message": "User already exists",
        "success": false
    }
```

## Display all users

<h4> Endpoints </h4>
URL:

```bash
    https://admin-panel-bi8j.onrender.com/api/admin/all-users
```

Method : ``GET``
<h3> Provide the following details</h5> 

`  1. Authorization: Bearer [token] (which is generated at the time of admin's login) `

### Success Response

```bash
    {
    "allUsers": [
        {
            "_id": "6551a5e471e908af038a656c",
            "Username": "Abcd11",
            "Email": "abcd11@gmail.com",
            "Password": "$2b$10$JQScAMm3/Xw5JT2/5TYixecym8ZNhXMsc5NItgkZhRER8UMzMLCqy",
            "__v": 0
        },
        {
            "_id": "6551a61371e908af038a6572",
            "Username": "Abcd111",
            "Email": "abcd111@gmail.com",
            "Password": "$2b$10$icB3V1f8apH.gvLZc1nscumiacop6WBFbmKyOHutqJa8FuvoTN7BO",
            "__v": 0
        },
        {
            "_id": "6551aaf826c7856aa4cf9bdf",
            "Username": "Abc1saaaaaaa",
            "Email": "abcd34@gmail.com",
            "Password": "$2b$10$dDiXk3Hm71qrkKGun91jf.8H0ykqB7l2gzhmePbUI3GWgGjgsTPX.",
            "__v": 0
        },
    ],
    "success": true
}
```

### Error Responses

```bash
    {
        "message": "unauthorized admin",
        "success": false
    }
```
```bash
    {
        "message": "users not found",
        "success": false
    }
```
