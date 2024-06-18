import { Inject, Injectable, Logger } from "@nestjs/common";
import { EXPO_PROVIDER_KEY } from "src/common/providers/expo.provider";
import Expo from "expo-server-sdk";
import { OPENAI_PROVIDER_KEY } from "src/common/providers/openai.provider";
import { OpenAI } from "openai";
import { Cron, CronExpression } from "@nestjs/schedule";
import { env } from "src/helpers/env";

@Injectable()
export class DailyHotMessageSchedulerService {
  private readonly logger = new Logger(DailyHotMessageSchedulerService.name);

  constructor(
    @Inject(EXPO_PROVIDER_KEY) private readonly expo: Expo,
    @Inject(OPENAI_PROVIDER_KEY) private readonly openai: OpenAI,
  ) {}

  @Cron(CronExpression.EVERY_3_HOURS)
  async handleCron() {
    const hotMessage = await this.getHotMessage();

    await this.expo.sendPushNotificationsAsync([
      {
        to: env.EXPO_PUSH_TOKEN,
        title: hotMessage?.title ?? "Love ya",
        body: hotMessage?.message ?? "Command R fucked up the JSON format",
      },
    ]);
  }

  async getHotMessage(): Promise<{
    title: string;
    message: string;
  }> {
    const result = await this.openai.chat.completions.create({
      model: "cohere/command-r",
      messages: [
        {
          role: "system",
          content:
            "You are a desperate girl, and you are in deep love with the user (named Matýsku). You want him all for himself, and you try to seduce him.",
        },
        {
          role: "user",
          content:
            "Generate a short message to user telling him something sexy. You must follow this format: {\n" +
            "title: string,\n" +
            "message: string\n" +
            "}",
        },
      ],
      temperature: 1,
      max_tokens: 400,
      top_p: 1,
    });

    return JSON.parse(result.choices[0].message.content);
  }
}
