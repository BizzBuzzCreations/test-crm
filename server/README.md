## 📋 Campaign: 
### **Create a Campaign**
- **POST** `http://localhost:8080/api/campaigns`
- **Body (JSON)**:
```json
{
  "name": "Real Estate Campaign"
}
```
- **Expected Response**:
```json
{
  "message": "Campaign created",
  "campaign": {
    "_id": "campaign_id",
    "name": "real estate campaign",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### **Get All Campaigns**
- **GET** `http://localhost:8080/api/campaigns`
- **Expected Response**:
```json
[
  {
    "_id": "campaign_id",
    "name": "real estate campaign",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
]
```

### **Update a Campaign**
- **PUT** `http://localhost:8080/api/campaigns/:id`
- **Body (JSON)**:
```json
{
  "name": "Updated Campaign Name"
}
```
- **Expected Response**:
```json
{
  "message": "Campaign updated",
  "campaign": {
    "_id": "campaign_id",
    "name": "updated campaign name",
    "createdAt": "timestamp",
    "updatedAt": "new timestamp"
  }
}
```

### **Delete a Campaign**
- **DELETE** `http://localhost:8080/api/campaigns/:id`
- **Expected Response**:
```json
{
  "message": "Campaign deleted"
}
```
---

## **📝 API Endpoints for User Type**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/user-types` | Create a new User Type |
| **GET** | `/api/user-types` | Get all User Types |
| **GET** | `/api/user-types/:id` | Get a specific User Type by ID |
| **PUT** | `/api/user-types/:id` | Update a User Type by ID |
| **DELETE** | `/api/user-types/:id` | Delete a User Type by ID |

## 📋 User Type:
### **Create a User Type**
- **Method**: `POST`  
- **URL**: `http://localhost:8080/api/user-types`  
- **Headers**:  
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "name": "Admin"
}
```
- **Expected Response (201 Created)**:
```json
{
  "message": "User type created successfully",
  "userType": {
    "_id": "65123abcd12345",
    "name": "admin",
    "createdAt": "2025-03-19T10:00:00.000Z",
    "updatedAt": "2025-03-19T10:00:00.000Z"
  }
}
```

### **Get All User Types**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/user-types`  
- **Expected Response (200 OK)**:
```json
[
  {
    "_id": "65123abcd12345",
    "name": "admin",
    "createdAt": "2025-03-19T10:00:00.000Z",
    "updatedAt": "2025-03-19T10:00:00.000Z"
  },
  {
    "_id": "65123abcd67890",
    "name": "user",
    "createdAt": "2025-03-19T10:05:00.000Z",
    "updatedAt": "2025-03-19T10:05:00.000Z"
  }
]
```

### **Get a User Type by ID**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/user-types/65123abcd12345`  
- **Expected Response (200 OK)**:
```json
{
  "_id": "65123abcd12345",
  "name": "admin",
  "createdAt": "2025-03-19T10:00:00.000Z",
  "updatedAt": "2025-03-19T10:00:00.000Z"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "User type not found"
}
```

### **Update a User Type**
- **Method**: `PUT`  
- **URL**: `http://localhost:8080/api/user-types/65123abcd12345`  
- **Headers**:
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "name": "Super Admin"
}
```
- **Expected Response (200 OK)**:
```json
{
  "message": "User type updated successfully",
  "userType": {
    "_id": "65123abcd12345",
    "name": "super admin",
    "createdAt": "2025-03-19T10:00:00.000Z",
    "updatedAt": "2025-03-19T10:10:00.000Z"
  }
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "User type not found"
}
```

### **Delete a User Type**
- **Method**: `DELETE`  
- **URL**: `http://localhost:8080/api/user-types/65123abcd12345`  
- **Expected Response (200 OK)**:
```json
{
  "message": "User type deleted successfully"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "User type not found"
}
```

---
## **📝 API Endpoints for Teams**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/teams` | Create a new Team |
| **GET** | `/api/teams` | Get all Teams |
| **GET** | `/api/teams/:id` | Get a specific Team by ID |
| **PUT** | `/api/teams/:id` | Update a Team by ID |
| **DELETE** | `/api/teams/:id` | Delete a Team by ID |

## 📋 Team:
### **Create a Team**
- **Method**: `POST`  
- **URL**: `http://localhost:8080/api/teams`  
- **Headers**:  
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "name": "Sales Team",
  "campaignId": "65123abcd67890"
}
```
- **Expected Response (201 Created)**:
```json
{
  "message": "Team created successfully",
  "team": {
    "_id": "65234efg56789",
    "name": "sales team",
    "campaignId": "65123abcd67890",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:15:00.000Z"
  }
}
```

### **Get All Teams**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/teams`  
- **Expected Response (200 OK)**:
```json
[
  {
    "_id": "65234efg56789",
    "name": "sales team",
    "campaignId": "65123abcd67890",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:15:00.000Z"
  },
  {
    "_id": "65234efg98765",
    "name": "marketing team",
    "campaignId": "65123abcd12345",
    "createdAt": "2025-03-19T10:20:00.000Z",
    "updatedAt": "2025-03-19T10:20:00.000Z"
  }
]
```

### **Get a Team by ID**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/teams/65234efg56789`  
- **Expected Response (200 OK)**:
```json
{
  "_id": "65234efg56789",
  "name": "sales team",
  "campaignId": "65123abcd67890",
  "createdAt": "2025-03-19T10:15:00.000Z",
  "updatedAt": "2025-03-19T10:15:00.000Z"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Team not found"
}
```

### **Update a Team**
- **Method**: `PUT`  
- **URL**: `http://localhost:8080/api/teams/65234efg56789`  
- **Headers**:
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "name": "Updated Sales Team"
}
```
- **Expected Response (200 OK)**:
```json
{
  "message": "Team updated successfully",
  "team": {
    "_id": "65234efg56789",
    "name": "updated sales team",
    "campaignId": "65123abcd67890",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:25:00.000Z"
  }
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Team not found"
}
```

### **Delete a Team**
- **Method**: `DELETE`  
- **URL**: `http://localhost:8080/api/teams/65234efg56789`  
- **Expected Response (200 OK)**:
```json
{
  "message": "Team deleted successfully"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Team not found"
}
```

--- 
## **📝 API Endpoints for Status**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/status` | Create a new Status |
| **GET** | `/api/status` | Get all Statuses |
| **GET** | `/api/status/:id` | Get a specific Status by ID |
| **PUT** | `/api/status/:id` | Update a Status by ID |
| **DELETE** | `/api/status/:id` | Delete a Status by ID |

## 📋 Status:
### **Create a Status**
- **Method**: `POST`  
- **URL**: `http://localhost:8080/api/status`  
- **Headers**:  
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "name": "pending"
}
```
- **Expected Response (201 Created)**:
```json
{
  "message": "Status created successfully",
  "status": {
    "_id": "65234efg56789",
    "name": "pending",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:15:00.000Z"
  }
}
```

### **Get All Statuses**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/status`  
- **Expected Response (200 OK)**:
```json
[
  {
    "_id": "65234efg56789",
    "name": "pending",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:15:00.000Z"
  },
  {
    "_id": "65234efg98765",
    "name": "completed",
    "createdAt": "2025-03-19T10:20:00.000Z",
    "updatedAt": "2025-03-19T10:20:00.000Z"
  }
]
```

### **Get a Status by ID**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/status/65234efg56789`  
- **Expected Response (200 OK)**:
```json
{
  "_id": "65234efg56789",
  "name": "pending",
  "createdAt": "2025-03-19T10:15:00.000Z",
  "updatedAt": "2025-03-19T10:15:00.000Z"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Status not found"
}
```

### **Update a Status**
- **Method**: `PUT`  
- **URL**: `http://localhost:8080/api/status/65234efg56789`  
- **Headers**:
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "name": "in-progress"
}
```
- **Expected Response (200 OK)**:
```json
{
  "message": "Status updated successfully",
  "status": {
    "_id": "65234efg56789",
    "name": "in-progress",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:25:00.000Z"
  }
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Status not found"
}
```

### **Delete a Status**
- **Method**: `DELETE`  
- **URL**: `http://localhost:8080/api/status/65234efg56789`  
- **Expected Response (200 OK)**:
```json
{
  "message": "Status deleted successfully"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Status not found"
}
```

---
## **📝 API Endpoints for Notes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/notes` | Create a new Note |
| **GET** | `/api/notes` | Get all Notes |
| **GET** | `/api/notes/:id` | Get a specific Note by ID |
| **PUT** | `/api/notes/:id` | Update a Note by ID |
| **DELETE** | `/api/notes/:id` | Delete a Note by ID |

## 📋 Note:
### **Create a New Note**
- **Method**: `POST`  
- **URL**: `POST http://localhost:8080/api/notes`  
- **Headers**:  
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "noteText": "This is the first note",
  "leadId": "65fd4c8e9d21a99b16d0f123",
  "userId": "65fd4b5a9d21a99b16d0f456"
}
```
- **Expected Response (201 Created)**:
```json
{
  "message": "Note created successfully",
  "note": {
    "_id": "65fd4c8e9d21a99b16d0f789",
    "notes": [
      {
        "noteText": "This is the first note",
        "createdAt": "2025-03-19T10:00:00.000Z"
      }
    ],
    "userId": "65fd4b5a9d21a99b16d0f456",
    "leadId": "65fd4c8e9d21a99b16d0f123",
    "createdAt": "2025-03-19T10:00:00.000Z",
    "updatedAt": "2025-03-19T10:00:00.000Z",
    "__v": 0
  }
}
```

### **Get All Notes**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/notes`  
- **Expected Response (200 OK)**:
```json
[
  {
    "_id": "65fd4c8e9d21a99b16d0f789",
    "notes": [
      {
        "noteText": "This is the first note",
        "createdAt": "2025-03-19T10:00:00.000Z"
      }
    ],
    "userId": {
      "_id": "65fd4b5a9d21a99b16d0f456",
      "name": "John Doe",
      "username": "johndoe"
    },
    "leadId": {
      "_id": "65fd4c8e9d21a99b16d0f123",
      "name": "Lead A"
    },
    "createdAt": "2025-03-19T10:00:00.000Z",
    "updatedAt": "2025-03-19T10:00:00.000Z"
  }
]
```

### **Get a Note by ID**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/notes/65a34bcf789efg`  
- **Expected Response (200 OK)**:
```json
{
  "_id": "65fd4c8e9d21a99b16d0f789",
  "notes": [
    {
      "noteText": "This is the first note",
      "createdAt": "2025-03-19T10:00:00.000Z"
    }
  ],
  "userId": {
    "_id": "65fd4b5a9d21a99b16d0f456",
    "name": "John Doe",
    "username": "johndoe"
  },
  "leadId": {
    "_id": "65fd4c8e9d21a99b16d0f123",
    "name": "Lead A"
  },
  "createdAt": "2025-03-19T10:00:00.000Z",
  "updatedAt": "2025-03-19T10:00:00.000Z"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Note not found"
}
```

### **Update a Note**
- **Method**: `PUT`  
- **URL**: `http://localhost:8080/api/notes/65a34bcf789efg`  
- **Headers**:
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "notes": [
    {
      "noteText": "Updated note content",
      "createdAt": "2025-03-19T10:10:00.000Z"
    }
  ]
}
```
- **Expected Response (200 OK)**:
```json
{
  "message": "Note updated successfully",
  "note": {
    "_id": "65fd4c8e9d21a99b16d0f789",
    "notes": [
      {
        "noteText": "Updated note content",
        "createdAt": "2025-03-19T10:10:00.000Z"
      }
    ],
    "userId": "65fd4b5a9d21a99b16d0f456",
    "leadId": "65fd4c8e9d21a99b16d0f123",
    "createdAt": "2025-03-19T10:00:00.000Z",
    "updatedAt": "2025-03-19T10:10:00.000Z"
  }
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Note not found"
}
```

### **Delete a Note**
- **Method**: `DELETE`  
- **URL**: `http://localhost:8080/api/notes/65a34bcf789efg`  
- **Expected Response (200 OK)**:
```json
{
  "message": "Note deleted successfully"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Note not found"
}
```

### **Append a Note**
- **Method**: `POST`
- **URL**: `POST http://localhost:8080/api/notes/append`
- **Headers**:
  - `Content-Type: application/json `  
- **Body (JSON)**:
```json
{
  "noteText": "This is an appended note",
  "leadId": "65fd4c8e9d21a99b16d0f123",
  "userId": "65fd4b5a9d21a99b16d0f456"
}
```
- **Expected Response (200 OK)**:
```json
{
  "message": "Note appended successfully",
  "note": {
    "_id": "65fd4c8e9d21a99b16d0f789",
    "notes": [
      {
        "noteText": "This is the first note",
        "createdAt": "2025-03-19T10:00:00.000Z"
      },
      {
        "noteText": "This is an appended note",
        "createdAt": "2025-03-19T10:05:00.000Z"
      }
    ],
    "userId": "65fd4b5a9d21a99b16d0f456",
    "leadId": "65fd4c8e9d21a99b16d0f123",
    "createdAt": "2025-03-19T10:00:00.000Z",
    "updatedAt": "2025-03-19T10:05:00.000Z"
  }
}
```
---

## **📝 API Endpoints for Users**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/users` | Create a new user |
| **GET** | `/api/users` | Get all users |
| **GET** | `/api/users/:id` | Get a specific user by ID |
| **PUT** | `/api/users/:id` | Update a user by ID |
| **DELETE** | `/api/users/:id` | Delete a user by ID |

## 📋 User:
### **Create a New User**
- **Method**: `POST`  
- **URL**: `http://localhost:8080/api/users`  
- **Headers**:  
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "securepassword",
  "campaignId": "65234abc56789",
  "teamId": "65b45def23456",
  "userTypeId": "65c56ghi78901"
}
```
- **Expected Response (201 Created)**:
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "65d67jkl89012",
    "name": "John Doe",
    "username": "johndoe",
    "campaignId": "65234abc56789",
    "teamId": "65b45def23456",
    "userTypeId": "65c56ghi78901",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:15:00.000Z"
  }
}
```

### **Get All Users**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/users`  
- **Expected Response (200 OK)**:
```json
[
  {
    "_id": "65d67jkl89012",
    "name": "John Doe",
    "username": "johndoe",
    "campaignId": "65234abc56789",
    "teamId": "65b45def23456",
    "userTypeId": "65c56ghi78901",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:15:00.000Z"
  }
]
```

### **Get a Specific User by ID**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/users/65d67jkl89012`  
- **Expected Response (200 OK)**:
```json
{
  "_id": "65d67jkl89012",
  "name": "John Doe",
  "username": "johndoe",
  "campaignId": "65234abc56789",
  "teamId": "65b45def23456",
  "userTypeId": "65c56ghi78901",
  "createdAt": "2025-03-19T10:15:00.000Z",
  "updatedAt": "2025-03-19T10:15:00.000Z"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "User not found"
}
```

### **Update a User**
- **Method**: `PUT`  
- **URL**: `http://localhost:8080/api/users/65d67jkl89012`  
- **Headers**:
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "name": "Johnathan Doe",
  "username": "john_doe_updated"
}
```
- **Expected Response (200 OK)**:
```json
{
  "message": "User updated successfully",
  "user": {
    "_id": "65d67jkl89012",
    "name": "Johnathan Doe",
    "username": "john_doe_updated",
    "campaignId": "65234abc56789",
    "teamId": "65b45def23456",
    "userTypeId": "65c56ghi78901",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:25:00.000Z"
  }
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "User not found"
}
```

### **Delete a User**
- **Method**: `DELETE`  
- **URL**: `http://localhost:8080/api/users/65d67jkl89012`  
- **Expected Response (200 OK)**:
```json
{
  "message": "User deleted successfully"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "User not found"
}
```
---

## **📝 API Endpoints for Notes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/notes` | Create a new Note |
| **GET** | `/api/notes` | Get all Notes |
| **GET** | `/api/notes/:id` | Get a specific Note by ID |
| **PUT** | `/api/notes/:id` | Update a Note by ID |
| **DELETE** | `/api/notes/:id` | Delete a Note by ID |

## 📋 Note:
### **Create a New Note**
- **Method**: `POST`  
- **URL**: `http://localhost:8080/api/notes`  
- **Headers**:  
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "notes": [
    {
      "noteText": "Lead called, follow up tomorrow."
    }
  ],
  "userId": "65234efg56789"
}
```
- **Expected Response (201 Created)**:
```json
{
  "message": "Note created successfully",
  "note": {
    "_id": "65a34bcf789efg",
    "notes": [
      {
        "noteText": "Lead called, follow up tomorrow.",
        "createdAt": "2025-03-19T10:15:00.000Z"
      }
    ],
    "userId": "65234efg56789",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:15:00.000Z"
  }
}
```

### **Get All Notes**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/notes`  
- **Expected Response (200 OK)**:
```json
[
  {
    "_id": "65a34bcf789efg",
    "notes": [
      {
        "noteText": "Lead called, follow up tomorrow.",
        "createdAt": "2025-03-19T10:15:00.000Z"
      }
    ],
    "userId": "65234efg56789",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:15:00.000Z"
  }
]
```

### **Get a Note by ID**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/notes/65a34bcf789efg`  
- **Expected Response (200 OK)**:
```json
{
  "_id": "65a34bcf789efg",
  "notes": [
    {
      "noteText": "Lead called, follow up tomorrow.",
      "createdAt": "2025-03-19T10:15:00.000Z"
    }
  ],
  "userId": "65234efg56789",
  "createdAt": "2025-03-19T10:15:00.000Z",
  "updatedAt": "2025-03-19T10:15:00.000Z"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Note not found"
}
```

### **Update a Note**
- **Method**: `PUT`  
- **URL**: `http://localhost:8080/api/notes/65a34bcf789efg`  
- **Headers**:
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "notes": [
    {
      "noteText": "Lead will be contacted again next week."
    }
  ]
}
```
- **Expected Response (200 OK)**:
```json
{
  "message": "Note updated successfully",
  "note": {
    "_id": "65a34bcf789efg",
    "notes": [
      {
        "noteText": "Lead will be contacted again next week.",
        "createdAt": "2025-03-19T10:25:00.000Z"
      }
    ],
    "userId": "65234efg56789",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:25:00.000Z"
  }
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Note not found"
}
```

### **Delete a Note**
- **Method**: `DELETE`  
- **URL**: `http://localhost:8080/api/notes/65a34bcf789efg`  
- **Expected Response (200 OK)**:
```json
{
  "message": "Note deleted successfully"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Note not found"
}
```
---

## **📝 API Endpoints for Leads**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/leads` | Create a new lead |
| **GET** | `/api/leads` | Get all leads |
| **GET** | `/api/leads/:id` | Get a specific lead by ID |
| **PUT** | `/api/leads/:id` | Update a lead by ID |
| **DELETE** | `/api/leads/:id` | Delete a lead by ID |

## 📋 Lead:
### **Create a New Lead**
- **Method**: `POST`  
- **URL**: `http://localhost:8080/api/leads`  
- **Headers**:  
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "email": "jane.doe@example.com",
  "doorNo": "A-101",
  "postcode": "123456",
  "description": "Interested in a property consultation.",
  "isActive": true,
  "userId": "65234abc56789",
  "statusId": "65b45def23456"
}
```
- **Expected Response (201 Created)**:
```json
{
  "message": "Lead created successfully",
  "lead": {
    "_id": "65d67jkl89012",
    "firstName": "Jane",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "email": "jane.doe@example.com",
    "doorNo": "A-101",
    "postcode": "123456",
    "description": "Interested in a property consultation.",
    "isActive": true,
    "userId": "65234abc56789",
    "statusId": "65b45def23456",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:15:00.000Z"
  }
}
```

### **Get All Leads**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/leads`  
- **Expected Response (200 OK)**:
```json
[
  {
    "_id": "65d67jkl89012",
    "firstName": "Jane",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "email": "jane.doe@example.com",
    "doorNo": "A-101",
    "postcode": "123456",
    "description": "Interested in a property consultation.",
    "isActive": true,
    "userId": "65234abc56789",
    "statusId": "65b45def23456",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:15:00.000Z"
  }
]
```

### **Get a Specific Lead by ID**
- **Method**: `GET`  
- **URL**: `http://localhost:8080/api/leads/65d67jkl89012`  
- **Expected Response (200 OK)**:
```json
{
  "_id": "65d67jkl89012",
  "firstName": "Jane",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "email": "jane.doe@example.com",
  "doorNo": "A-101",
  "postcode": "123456",
  "description": "Interested in a property consultation.",
  "isActive": true,
  "userId": "65234abc56789",
  "statusId": "65b45def23456",
  "createdAt": "2025-03-19T10:15:00.000Z",
  "updatedAt": "2025-03-19T10:15:00.000Z"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Lead not found"
}
```

### **Update a Lead**
- **Method**: `PUT`  
- **URL**: `http://localhost:8080/api/leads/65d67jkl89012`  
- **Headers**:
  - `Content-Type: application/json`  
- **Body (JSON)**:
```json
{
  "phoneNumber": "+9876543210",
  "description": "Updated lead details."
}
```
- **Expected Response (200 OK)**:
```json
{
  "message": "Lead updated successfully",
  "lead": {
    "_id": "65d67jkl89012",
    "firstName": "Jane",
    "lastName": "Doe",
    "phoneNumber": "+9876543210",
    "email": "jane.doe@example.com",
    "doorNo": "A-101",
    "postcode": "123456",
    "description": "Updated lead details.",
    "isActive": true,
    "userId": "65234abc56789",
    "statusId": "65b45def23456",
    "createdAt": "2025-03-19T10:15:00.000Z",
    "updatedAt": "2025-03-19T10:25:00.000Z"
  }
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Lead not found"
}
```

### **Delete a Lead**
- **Method**: `DELETE`  
- **URL**: `http://localhost:8080/api/leads/65d67jkl89012`  
- **Expected Response (200 OK)**:
```json
{
  "message": "Lead deleted successfully"
}
```
- **If ID Not Found (404 Not Found)**:
```json
{
  "error": "Lead not found"
}
```

---