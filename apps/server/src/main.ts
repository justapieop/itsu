import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { INestApplication, ValidationPipe, ClassSerializerInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppModule } from "./App.module";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const docs: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
  .setTitle("itsu-api")
  .setDescription("OpenAPI specification for itsu API server")
  .addBearerAuth({ type: "apiKey", })
  .build();

  SwaggerModule.setup("/api-docs", app, () => SwaggerModule.createDocument(app, docs));

  const config: ConfigService = app.get(ConfigService);

  await app.listen(config.get<number>("PORT", 3000));
}
bootstrap();
