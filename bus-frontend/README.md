# FleetFlow — Bus CRUD Frontend

React + Vite + Bootstrap frontend for the Spring Boot Bus CRUD API.

## Requirements
- Node.js and npm
- Spring Boot backend running at `http://localhost:8081`
- Backend CORS configured to allow `http://localhost:5173`

## Run
```bash
npm install
npm run dev
```
Open `http://localhost:5173`.

## API endpoints used
- `GET /DisplayAll`
- `GET /Display/{id}`
- `POST /Add`
- `PUT /Update/{id}`
- `DELETE /Delete/{id}`

## Configure API URL
By default the app calls `http://localhost:8081`. To change it, create `.env` in the project root:
```env
VITE_API_BASE_URL=http://localhost:8081
```
Restart the Vite dev server after changing `.env`.

## Important: CORS
If the browser reports a CORS error, allow the frontend origin in the Spring Boot backend. Example controller-level annotation:
```java
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class BusController { ... }
```
Alternatively, configure global CORS in your Spring Boot configuration. Use only one suitable approach.

## Notes
- The add form intentionally has no ID input. The database generates the ID.
- The form sends `busNumber`, `operatorName`, `seatingCapacity` (number), and `acAvailable` (boolean).
- Backend validation should remain enabled with `@Valid` and Jakarta validation annotations.
