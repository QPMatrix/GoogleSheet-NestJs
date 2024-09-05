
# Google Sheets Integration with NestJS

This project integrates Google Sheets with a NestJS backend. It allows updating and retrieving data from Google Sheets using the Google Sheets API.

## Description

This project demonstrates how to use the Google Sheets API within a NestJS application to read and update Google Sheets programmatically. You can update specific cells based on the day, row, and value, or fetch all the data from the Google Sheet.

## Project Setup

1. Clone the repository.
2. Install dependencies using `pnpm`:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root of the project and add the following environment variables:

   ```bash
   GOOGLE_SHEET_ID=<your-google-sheet-id>
   GOOGLE_CREDENTIALS=./credentials.json
   ```

    - Replace `<your-google-sheet-id>` with the ID of your Google Sheet.
    - Make sure `credentials.json` is a valid Google service account JSON file.

4. Place your `credentials.json` file in the project root or another directory, as specified in the `GOOGLE_CREDENTIALS` environment variable.

## Google Sheets API Integration

### Key Functions:

- **Update Cell by Day, Row, and Value**:
  You can update a specific cell in the sheet based on the day (e.g., Monday), row, and value.

- **Get All Data from Google Sheet**:
  Retrieve all data from the sheet within the specified range.

### Example POST Request (for updating):

To update a cell in the Google Sheet via a `POST` request, use the following:

- **URL**: `http://localhost:3000/update`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body** (JSON format):

   ```json
   {
     "day": 2,    // Enum for Monday (1 for Sunday, 2 for Monday, etc.)
     "row": 3,    // Row number in the Google Sheet
     "value": "99"  // New value for the cell
   }
   ```

### Example GET Request (for reading data):

To retrieve all the data from the sheet, send a `GET` request to:

- **URL**: `http://localhost:3000//all-data`
- **Method**: `GET`

## How It Works

### Step-by-Step:

1. **Authenticate with Google Sheets API**:  
   The app uses a Google service account for authentication, which is configured in the `credentials.json` file.

2. **Update Cells**:  
   The `updateCellByDay` method takes a day (e.g., Monday), row, and value and updates the corresponding cell in the Google Sheet.

3. **Fetch Data**:  
   The `getData` method fetches the data from the entire sheet or a specific range.

### Running the Project

To start the project, run the following commands:

```bash
# Development mode
pnpm run start:dev
```

### Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [NestJS Documentation](https://docs.nestjs.com)

## License

This project is [MIT licensed](https://opensource.org/licenses/MIT).
