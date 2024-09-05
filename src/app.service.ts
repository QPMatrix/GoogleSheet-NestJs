import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Days } from './types';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { promises as fs } from 'fs';

@Injectable()
export class AppService {
  private sheetName = 'Sheet1';

  constructor(private readonly configService: ConfigService) {}

  private credentialsPath =
    this.configService.get<string>('GOOGLE_CREDENTIALS');
  private spreadsheetId = this.configService.get<string>('GOOGLE_SHEET_ID');

  // Day to column map based on the enum
  dayToColumnMap: { [key in Days]: string } = {
    [Days.Sunday]: 'E',
    [Days.Monday]: 'D',
    [Days.Tuesday]: 'C',
    [Days.Wednesday]: 'B',
    [Days.Thursday]: 'A',
  };

  // Function to update a cell based on the day, row, and value
  async updateCellByDay(day: Days, row: number, value: string) {
    const auth = await this.authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    const column = this.dayToColumnMap[day];
    if (!column) {
      throw new Error('Invalid day provided');
    }

    const range = `${this.sheetName}!${column}${row}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[value]],
      },
    });

    return { day, row, value };
  }

  // Function to get all data from the sheet
  async getData() {
    const auth = await this.authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    const range = `${this.sheetName}!A:Z`;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      throw new Error('No data found');
    }

    return rows;
  }

  // Authenticate function to handle authentication with Google Sheets API
  private async authenticate(): Promise<OAuth2Client> {
    const credentialsFile = await fs.readFile(this.credentialsPath, 'utf8');
    const credentials = JSON.parse(credentialsFile);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return (await auth.getClient()) as OAuth2Client;
  }
}
