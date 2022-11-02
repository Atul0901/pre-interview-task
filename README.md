# Pre-Interview Task
f

## Project - Cloth Management

##  User
### Models
- User Model
```yaml
{ 
  fname: {string, mandatory},
  lname: {string, mandatory},
  email: {string, mandatory, valid email, unique},
  phone: {string, mandatory, unique, valid Indian mobile number}, 
  password: {string, mandatory, minLen 8, maxLen 15}, // encrypted password
 
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```


## User APIs 
### POST /register
- Create a user document from request body.
- Save password in encrypted format. (use bcrypt)
- __Response format__
  - _**On success**_ - Return HTTP status 201. Also return the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "User created successfully",
    "data": {
        "fname": "Atul",
        "lname": "Yadav",
        "email": "atulyadav@gmail.com",
        "phone": 93405330569,
        "password": "$2b$10$DpOSGb0B7cT0f6L95RnpWO2P/AtEoE6OF9diIiAEP7QrTMaV29Kmm",
        "_id": "6162876abdcb70afeeaf9cf5",
        "createdAt": "2022-10-10T06:25:46.051Z",
        "updatedAt": "2022-10-10T06:25:46.051Z",
    }
}
```

### POST /login
- Allow an user to login with their email and password.
- On a successful login attempt return the userId and a JWT token containing the userId, exp, iat.
- __Response format__
  - _**On success**_ - Return HTTP status 200 and JWT token in response body. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "User login successfully",
    "data": {
        "userId": "6165f29cfe83625cf2c10a5c",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTYyODc2YWJkY2I3MGFmZWVhZjljZjUiLCJpYXQiOjE2MzM4NDczNzYsImV4cCI6MTYzMzg4MzM3Nn0.PgcBPLLg4J01Hyin-zR6BCk7JHBY-RpuWMG_oIK7aV8"
    }
}
```

## GET /user/:userId/profile (Authentication required)
- Allow an user to fetch details of their profile.
- Make sure that userId in url param and in token is same
- __Response format__
  - _**On success**_ - Return HTTP status 200 and returns the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "User profile details",
    "data": {
       
        "_id": "6162876abdcb70afeeaf9cf5",
        "fname": "Atul",
        "lname": "Yadav",
        "email": "atulyadav@gmai.com",
        "phone": 9876543210,
        "password": "$2b$10$DpOSGb0B7cT0f6L95RnpWO2P/AtEoE6OF9diIiAEP7QrTMaV29Kmm",
        "createdAt": "2022-10-10T06:25:46.051Z",
        "updatedAt": "2022-10-10T06:25:46.051Z",
        "__v": 0
    }
}
```

## PUT /user/:userId/profile (Authentication and Authorization required)
- Allow an user to update their profile.
- A user can update all the fields
- Make sure that userId in url param and in token is same
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the updated user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "User profile updated",
    "data": {
        "_id": "6162876abdcb70afeeaf9cf5",
        "fname": "Atul",
        "lname": "Yadav",
        "email": "atulyadav@gmail.com",
        "phone": 9340533059,
        "password": "$2b$10$jgF/j/clYBq.3uly6Tijce4GEGJn9EIXEcw9NI3prgKwJ/6.sWT6O",
        "createdAt": "2022-10-10T06:25:46.051Z",
        "updatedAt": "2022-10-10T08:47:15.297Z",
        "__v": 0
    }
}
```


## Product
### Models
- Product Model
```yaml
{ 
  title: {string, mandatory, unique},
  description: {string, mandatory},
  productImage: {string, mandatory},  // s3 link
  style: {string},
  availableSizes: {array of string, at least one size, enum["S", "XS","M","X", "L","XXL", "XL"]},
  deletedAt: {Date, when the document is deleted}, 
  isDeleted: {boolean, default: false},
  createdAt: {timestamp},
  updatedAt: {timestamp},
}
```


## Products API 
### POST /products
- Create a product document from request body.
- Upload product image to S3 bucket and save image public url in document.
- __Response format__
  - _**On success**_ - Return HTTP status 201. Also return the product document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

### GET /products
- Returns all products in the collection that aren't deleted.
  
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the product documents. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

### GET /products/:productId
- Returns product details by product id
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the product documents. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

### PUT /products/:productId
- Updates a product by changing at least one or all fields
- Check if the productId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the updated product document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

### DELETE /products/:productId
- Deletes a product by product id if it's not already deleted
- __Response format__
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

## Response

### Successful Response structure
```yaml
{
  status: true,
  message: 'Success',
  data: {

  }
}
```

## Collections
## users
```yaml
{
  _id: ObjectId("88abc190ef0288abc190ef02"),
  fname: 'John',
  lname: 'Doe',
  email: 'johndoe@mailinator.com',
  phone: 9876543210,
  password: '$2b$10$O.hrbBPCioVm237nAHYQ5OZy6k15TOoQSFhTT.recHBfQpZhM55Ty', // encrypted password
  
  createdAt: "2022-09-17T04:25:07.803Z",
  updatedAt: "2022-09-17T04:25:07.803Z",
}
```
### products
```yaml
{
  _id: ObjectId("88abc190ef0288abc190ef55"),
  title: 'Nit Grit',
  description: 'Dummy description',
  productImage: 'http://function-up-test.s3.amazonaws.com/products/product/nitgrit.jpg',  // s3 link
  style: 'Colloar',
  availableSizes: ["S", "XS","M","X", "L","XXL", "XL"],
  deletedAt: null, 
  isDeleted: false,
  createdAt: "2022-09-17T04:25:07.803Z",
  updatedAt: "2022-09-17T04:25:07.803Z",
}