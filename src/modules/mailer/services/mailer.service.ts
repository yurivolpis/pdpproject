import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAWSConfig, IConfig } from '../../../config/interfaces';

@Injectable()
export class MailerService {
  private sesClient: SESClient;

  constructor(
    private readonly configService: ConfigService<IConfig>,
    private readonly jwtService: JwtService,
  ) {
    const awsConfig = configService.get<IAWSConfig>('aws');

    this.sesClient = new SESClient({
      credentials: {
        accessKeyId: awsConfig.accessKey,
        secretAccessKey: awsConfig.secretAccessKey,
      },
      region: awsConfig.region,
    });
  }

  async sendResetPasswordLink(email: string) {
    const resetToken = this.jwtService.sign({ email });
    const backendUrl = this.configService.get('backendUrl');

    const resetLink = `https://${backendUrl}/reset-password?token=${resetToken}`;

    const subject = 'Password Reset Request';
    const body = `You requested to reset your password. Click the link to reset it: ${resetLink}`;
    await this.sendEmail(email, subject, body);
  }

  async verifyResetPasswordToken(token: string): Promise<string> {
    const payload = this.jwtService.verify(token);

    if (typeof payload === 'object' && 'email' in payload) {
      return payload.email;
    }
    throw new BadRequestException();
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const params = {
      Source: 'yuri.h@volpis.com',
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: body,
          },
        },
      },
    };

    try {
      await this.sesClient.send(new SendEmailCommand(params));
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }
}
