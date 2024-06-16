import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ScheduleModule } from "@nestjs/schedule";
import { TestSchedulerService } from "./common/schedulers/test.scheduler.service";
import { OpenAIProvider } from "./common/providers/openai.provider";
import { DatabaseProvider } from "./common/providers/database.provider";
import { FucksGivenModule } from "./routes/fucks-given/fucks-given.module";
import { ApiKeyGuard } from "./common/guards/api-key.guard";
import { CacheModule } from "@nestjs/cache-manager";
import { TestsModule } from "./routes/tests/tests.module";
import { FirebaseAdminProvider } from "./common/providers/firebase-admin.provider";
import { NotificationsModule } from "./routes/notifications/notifications.module";
import { ExpoProvider } from "./common/providers/expo.provider";
import { GoodMorningSchedulerService } from "./common/schedulers/good-morning.scheduler.service";
import { ProvidersModule } from "./common/providers/providers.module";
import { ServicesModule } from "./common/services/services.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    FucksGivenModule,
    CacheModule.register(),
    TestsModule,
    NotificationsModule,
    ProvidersModule,
    ServicesModule,
  ],
  controllers: [AppController],
  // Almost everything should be imported here.
  // For example, cron services
  providers: [
    // CRON / services
    TestSchedulerService,
    GoodMorningSchedulerService,

    // Services
    AppService,

    // Providers
    OpenAIProvider,
    DatabaseProvider,
    ExpoProvider,
    FirebaseAdminProvider,

    // Guards
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
