import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CompanyService {
  private readonly filePath = path.join(__dirname, '../../companyNames.json');

  async getCompanyNames(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          reject('Error reading company names.');
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  async addCompanyName(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          reject('Error reading company names.');
        } else {
          let companyNames = JSON.parse(data);
          if (!companyNames.includes(name)) {
            companyNames.push(name);
            fs.writeFile(this.filePath, JSON.stringify(companyNames), (err) => {
              if (err) {
                reject('Error saving company name.');
              } else {
                resolve('Company name added.');
              }
            });
          } else {
            resolve('Company name already exists.');
          }
        }
      });
    });
  }
}
