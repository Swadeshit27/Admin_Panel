# Admin panel

## Overview

This project is basically a simple authentication system API using node js, Express js, and Mongodb incorporating Json Web Token for user authentication. The system will have two types of users -

1. Admin 
1. Normal user

Admin can register themselves, while normal users cannot register directly. Instead, they can only be added by an authenticated admin.

> [!NOTE]
>
> To test this application you need postman

## Tech tools & NPM Packages

| Ser. no | Tools          |
| ------: | -------------- |
|       1 | Node js        |
|       2 | Express js     |
|       3 | Mongodb        |
|       4 | Json Web Token |
|       4 | Bcrypt         |
|       4 | validator         |

# Procedure

## Admin Registration

<h4> Endpoints </h4>
URL:

```bash
      https://admin-panel-bi8j.onrender.com/api/admin/register
```

Method : ``POST``
 
> [!IMPORTANT]
>
>  1. Username (string)
>  1. Email (string)
>  1. Password (string)
>    

> [!NOTE]
>
>  1. Username and Email should be unique else throw error.
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
        "message": "admin registration successful",
        "success": true
    }
```

## Admin Login

<h4> Endpoints </h4>
URL:

```bash
    https://admin-panel-bi8j.onrender.com/api/admin/login
```

Method : ``POST``
 
> [!IMPORTANT]
>
>  1. Username (string)
>  1. Password (string)


> [!NOTE]
>
>  1.  Username should be unique.
>  1.  After successful login you will receive a token as a response and this token will be needed while adding the normal users because using this token server will check if the admin is valid or not
>

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




## Add normal user

<h4> Endpoints </h4>
URL:

```bash
    https://admin-panel-bi8j.onrender.com/api/admin/add-user
```

Method : ``POST``

> [!IMPORTANT]
>
>  1. Username (string)
>  1. Email (string)
>  1. Password (string)
>  1. Authorization: Bearer [token] (which is generated at the time of admin's login)

> [!NOTE]
>
>  1. Username and Email should be unique else throw error.
>  1. Enter proper email as it's validated else throw error.
>  1. Also make sure that a admin can't register himself/herself as a normal user.

### Example

```bash
   {
    "email":"user@gmail.com",
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

## Display all users

<h4> Endpoints </h4>
URL:

```bash
    https://admin-panel-bi8j.onrender.com/api/admin/all-users
```

Method : ``GET``

> [!IMPORTANT]
>  1. Authorization: Bearer [token] (which is generated at the time of admin's login)

```bash
    {
    "allUsers": [],
    "success": true
    }
```
