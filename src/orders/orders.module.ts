import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { ORDER_SERVICE } from 'src/config/services';
import { OrdersController } from './orders.controller';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMicroserviceHost,
          port: envs.ordersMicroservicePort
        }
      }
    ])
  ],
  controllers: [OrdersController],
  providers: []
})
export class OrdersModule { }
