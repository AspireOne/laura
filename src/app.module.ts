import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ScheduleModule } from "@nestjs/schedule";
import { CronService } from "./cron/cron.service";
import { OpenAIProvider } from "./providers/openai.provider";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, CronService, OpenAIProvider],
})
export class AppModule {}
