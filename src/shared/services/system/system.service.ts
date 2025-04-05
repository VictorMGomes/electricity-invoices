import { Injectable } from '@nestjs/common';
import * as packageJson from 'package.json';

@Injectable()
export class SystemService {
  getAppName(): string {
    return packageJson.name;
  }
  getAppVersion(): string {
    return packageJson.version;
  }
  getAppDescription(): string {
    return packageJson.description;
  }
  getAppAuthor(): { name: string; email: string; url: string } {
    return packageJson.author;
  }
}
