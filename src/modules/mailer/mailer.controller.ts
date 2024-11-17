import { Controller } from '@nestjs/common';
import { MailerService } from './services/mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
}
