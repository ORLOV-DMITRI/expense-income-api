import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as CookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    const config = new DocumentBuilder().setTitle("Expense-Income").build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api", app, document);

    app.use(CookieParser());
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(3000);
}

bootstrap();
