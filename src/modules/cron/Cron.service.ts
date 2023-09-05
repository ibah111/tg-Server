import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

/**
 * @description По скольку я не знаю как работать с кроном
 * и как правильно ему указывать тайминги поэтмоу я оставлю себе подсказку
 * @hint =>
 * -----------
 * * * * * * *
 * | | | | | |
 * | | | | | day of week
 * | | | | months
 * | | | day of month
 * | | hours
 * | minutes
 */
@Injectable()
export class CronService {
  constructor(private readonly reg: SchedulerRegistry) {}
  private readonly logger = new Logger(CronService.name);

  /**
   * @returns в дальнейшем данный метод должен будет перезаписывать соглашения согласно данным контакта
   */
  @Cron(CronExpression.EVERY_10_MINUTES)
  handleCron() {
    const job = this.reg.getCronJob('TEst');
    console.log(job.nextDates(1));
    this.logger.debug(
      'Cron is launched. Data syncronize happes everyday at midnight',
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'TEst' })
  syncronize() {
    return;
  }
}
