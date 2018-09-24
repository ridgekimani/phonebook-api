**Phonebook API**

#### Setup

```bash
# install dependencies
$ npm install # Or yarn install

# Add env variables.
- Create a .env file with the contents in the .env-sample file

# serve with hot reload at localhost:3000
$ yarn watch
```

RESTFUL PHONEBOOK API

#### AUTH API endpoints

##### 1. Register User

- URL:
  - /api/v1/auth/register
- METHOD:
  - POST
- DATA FORMAT
  - application/json
- PAYLOAD:

  - email
  - password
  - firstName
  - lastName

- SUCCESS:
  - status code 201
  - content {"success": "user created successfully", "token": "token_example"}

* ERROR:
  - status code 400
  - content
    OR
  - status code 409

##### 2. Authenticate User

- URL:
  - /api/v1/authenticate
- METHOD:
  - POST
- DATA FORMAT
  - application/json
- PAYLOAD:

  - email
  - password

- SUCCESS:
  - status code 200
  - content {"success": "User authenticated successfully", "token": "token_example"}

* ERROR:
  - status code 400
  - content

#### Phonebook APIs (PROTECTED WITH JWT TOKEN)

##### 1. Create contact

- URL:
  - /api/v1/contact/
- METHOD:
  - POST
- DATA FORMAT
  - application/json
- PAYLOAD:

  - firstName
  - lastName
  - phone
  - company
  - email
  - country

- SUCCESS:
  - status code 201
  - content
    {
    "success: "Contact created successfully"
    "contact": {}
    }

* ERROR:
  - status code 400
    OR
  - status code 403

##### 2. Read Contact

- URL:
  - /api/v1/contacts/
  - /api/v1/contact/:contact-id
- METHOD:
  - GET
- DATA FORMAT
  - application/json
- PARAMETERS:

  - contact-id

- SUCCESS:

  - status code 200
  - content


         {
             "contact": {}
         }

OR

- content


         {
              contacts": [
                  { },
                  { }
              ]
         }

- ERROR:

  - status code 400

  OR

  - status code 404

OR

- status code 403

#### 3. Update Contact

- URL:
  - /api/v1/contact/:contact-id
- METHOD:
  - PATCH
- DATA FORMAT
  - application/json
- PAYLOAD:

  - firstName
  - lastName
  - phone
  - company
  - email
  - country

- SUCCESS:
  - status code 200
  - content


         {
             "success": "Contact updated successfully"
             "contact": { }
         }

- ERROR:
  - status code 400
    OR
  - status code 403
    OR
  - status code 404

#### 4. Delete Contact

- URL:
  - /api/v1/contact/:contact-id
- METHOD:
  - DELETE
- DATA FORMAT
  - application/json
- REQUIRED:
  - contact-id
- SUCCESS:
  - status code 204
- ERROR:
  - status code 400
    OR
  - status code 403
    OR
  - status code 404

### ERRORS

400: { error: ${validation errors} }

401: { error: "User not authorized" }

404: { error: "${resource} not found" }

409: { error: "${resource} already exists" }

500: { error: "server error" }
