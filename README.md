# Humble Superhero API 🦸‍♂️🦸‍♀️

Welcome to the **Humble Superhero API** – where every hero shines with both power and humility! This API is a tribute to those extraordinary individuals who save the day without ever seeking the spotlight. Built with **NestJS**, it’s robust, well-tested, and ready for production-level awesomeness.

---

## 🚀 About This Project

The Humble Superhero API is designed to:
- **Add New Superheroes:** Capture the name, superpower, and a humility score (1-10) of every hero.
- **Retrieve Superheroes:** Fetch a sorted list of heroes by their humility score (highest first).

**Key Features:**
- **Expressive Validation:** Powered by \`class-validator\` and \`class-transformer\` with clear Swagger documentation.
- **Centralized Error Handling:** Custom global exception filters ensure consistency and clarity in error responses.
- **Robust Testing:** Comprehensive unit and E2E tests covering various edge cases.
- **Modular Architecture:** Clean separation of concerns for easy scalability and maintainability.

---

## 💾 Installation

### Prerequisites
- **Node.js** (v14 or later)
- **npm** (v6 or later)

### Steps to Install

1. **Clone the Repository:**
   ```bash
   https://github.com/nektgr/humble-superhero-api.git
   cd humble-superhero-api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

---

## ⚙️ Running the Application

### In Development Mode
Start the server locally:
```bash
npm run start
```
The API will be available at: [http://localhost:3000](http://localhost:3000)

### In Production Mode
For a production-ready build:
```bash
npm run start:prod
```

---

## 🧪 Testing

Our project is thoroughly tested! Run the following commands to verify everything works as expected:

- **Run All Tests:**
  ```bash
  npm test
  ```

- **Run End-to-End Tests:**
  ```bash
  npm run test:e2e
  ```

Tests cover:
- **Unit Tests:** Individual modules, services, and DTO validations.
- **E2E Tests:** API endpoints, error handling, and middleware integration using \`supertest\`.

---

## 🔍 API Endpoints

### **POST** \`/superheroes\`
- **Description:** Add a new superhero.
- **Request Body Example:**
  ```json
  {
    "name": "Captain Kindness",
    "superpower": "Empathy & Compassion",
    "humilityScore": 9
  }
  ```
- **Responses:**
  - \`201 Created\` – Superhero successfully added.
  - \`400 Bad Request\` – Validation errors (e.g., duplicate hero, invalid inputs).

### **GET** \`/superheroes\`
- **Description:** Retrieve all superheroes, sorted by humility score (highest first).
- **Response Example:**
  ```json
  [
    {
      "name": "Captain Kindness",
      "superpower": "Empathy & Compassion",
      "humilityScore": 9
    },
    {
      "name": "Mighty Mentor",
      "superpower": "Wisdom",
      "humilityScore": 8
    }
  ]
  ```

Access full API docs via **Swagger UI** at: [http://localhost:3000/api](http://localhost:3000/api)

---

## 🤝 Collaboration & Contribution

This project was built with the spirit of teamwork and superhero camaraderie. If you’re interested in contributing:
- **Fork & Clone:** Create your own branch.
- **Commit with Care:** Write clear commit messages and detailed PR descriptions.
- **Report Issues:** Use GitHub Issues to share bugs or propose new features.

*Remember, even superheroes sometimes need a sidekick!*

---

## 🕒 If I Had More Time…

- **Persistent Storage:** Integrate a database for long-term data persistence.
- **Expanded API Features:** Add endpoints for updating and deleting superheroes.
- **Real-Time Dashboard:** Build a React interface for live updates.
- **Enhanced Security:** Implement rate limiting, CORS, and other security best practices.
- **Advanced Logging:** Integrate a production-grade logging system (e.g., Winston).

---

## 📝 License

This project is licensed under the MIT License.

---

## 📬 Contact

For questions or collaboration opportunities:
- **Email:** npapakwn@hotmail.com
- **GitHub:** [nektgr](https://github.com/nektgr)

---

> **"With great power comes great humility."**  
> — Your Friendly Neighborhood Developer 🕷️💥

---

Enjoy building amazing things with the **Humble Superhero API**! 🚀✨

