import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Days } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Endpoint to update a cell based on the day and row provided
  @Post('update')
  async updateCellByDay(
    @Body('day') day: Days,
    @Body('row') row: number,
    @Body('value') value: string,
  ) {
    try {
      const result = await this.appService.updateCellByDay(day, row, value);
      return { message: `Successfully updated cell in ${day}`, result };
    } catch (error) {
      return { message: 'Error updating cell', error: error.message };
    }
  }

  // Endpoint to get all data from the sheet
  @Get('all-data')
  async getAllData() {
    try {
      const data = await this.appService.getData();
      return { message: 'Data fetched successfully', data };
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }
}
