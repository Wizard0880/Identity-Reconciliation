# **Identity Reconciliation API** 🚀  

![Identity Reconciliation](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)  
An API that manages user identity reconciliation based on email and phone number, ensuring a unified identity system.  

## **📌 Features**  
- ✅ Identify a user based on email or phone number.  
- ✅ Establish primary and secondary contacts for linking.  
- ✅ Merge multiple contact records under a single identity.  
- ✅ Ensures no duplicate primary contacts exist.  

---

## **🚀 Getting Started**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/Wizard0880/Identity-Reconciliation.git
cd identity-reconciliation
```

### **2️⃣ Install Dependencies**  
```bash
npm install
```

### **3️⃣ Set Up Environment Variables**  
Create a `.env` file in the root directory and add:  
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/identity_db
```

### **4️⃣ Start the Server**  
```bash
npm start
```
Server will run at: **`http://localhost:3000`**  

---

## **📡 API Endpoints**  

| Method | Endpoint      | Description                     |
|--------|-------------|--------------------------------|
| POST   | `/identify` | Identify user based on contact |

---

## **📌 Usage**  

### **🔹 Identify a User**  
This API identifies a user by email or phone and returns a structured contact record.  

#### **Request Body:**  
```json
{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}
```

#### **Response:**  
```json
{
  "contact": {
    "primaryContactId": "65abc123d456ef7890123456",
    "emails": ["user@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": []
  }
}
```

---

## **📌 Request Examples**  

### **1️⃣ Create a Primary Contact**
```json
{
  "email": "lorraine@hillvalley.edu",
  "phoneNumber": "123456"
}
```

### **2️⃣ Create a Secondary Contact**
```json
{
  "email": "mcfly@hillvalley.edu",
  "phoneNumber": "123456"
}
```

### **3️⃣ Identify User by Email Only**
```json
{
  "email": "lorraine@hillvalley.edu"
}
```

### **4️⃣ Identify User by Phone Only**
```json
{
  "phoneNumber": "123456"
}
```

---

## **📂 Project Structure**  

```
identity-reconciliation/
│── controllers/
│   ├── contactController.js
│── models/
│   ├── Contact.js
│── routes/
│   ├── contactRoutes.js
│── utils/
│   ├── contactUtils.js
│── server.js
│── package.json
│── README.md
│── .env
```

---

## **🛠️ Technologies Used**  

| Technology    | Description                         |
|--------------|------------------------------------|
| Node.js      | Backend Runtime Environment       |
| Express.js   | Web Framework for API Development |
| MongoDB      | NoSQL Database                    |
| Mongoose     | ODM for MongoDB                   |
| Postman      | API Testing Tool                  |

---

## **🤝 Contributing**  
🔹 Fork the repository.  
🔹 Create a new branch (`git checkout -b feature-branch`).  
🔹 Commit your changes (`git commit -m 'Added new feature'`).  
🔹 Push to the branch (`git push origin feature-branch`).  
🔹 Open a **Pull Request**.  

---

## **📜 License**  
This project is **open-source** and available under the [MIT License](LICENSE).  

---

### 🚀 **Happy Coding!** 💻🎯  

