import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as fs from 'node:fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    // SSL Configuration
    const httpsOptions = process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH ? {
        key: fs.readFileSync(process.env.SSL_KEY_PATH), cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    } : undefined;

    // Create the NestJS app with SSL if available
    const app = httpsOptions ? await NestFactory.create(AppModule, { httpsOptions }) : await NestFactory.create(AppModule);

    // Swagger setup
    const config = new DocumentBuilder()
        .setTitle('Explore City API')
        .setDescription('Explore City project API documentation')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    // Determine which port to use
    const port = httpsOptions ? 3443 : 3000;
    await app.listen(port);

    console.log(`Application running on ${httpsOptions ? 'https' : 'http'}://localhost:${port}`);
}

void bootstrap().then(r => console.log(r));