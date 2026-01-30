import { Module } from '@nestjs/common';
import { MenusModule } from './menus/menus.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MenusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
