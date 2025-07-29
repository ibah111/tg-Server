import { Global, Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GptController } from './gpt.controller';
import { HttpsProxyAgent } from 'https-proxy-agent';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [
    {
      provide: OpenAI,
      useFactory: (configService: ConfigService) => {
        const proxyUrl = configService.get<string>('PROXY_URL');
        const proxyConfig = proxyUrl
          ? {
              httpAgent: new HttpsProxyAgent(proxyUrl),
              httpsAgent: new HttpsProxyAgent(proxyUrl),
            
          }
          : {};

        return new OpenAI({
          apiKey: configService.get<string>('OPENAI_API_KEY'),
          ...proxyConfig,
        });
      },
      inject: [ConfigService],
    },
    GptService,
  ],
  exports: [GptService],
  controllers: [GptController],
})
export class GptModule {}
