import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'create_order' }, createOrderDto);
  }

  @Get()
  async findAllOrders(@Query() orderPaginationDto: OrderPaginationDto) {

    try {
      
      const orders = await firstValueFrom(
        this.client.send({ cmd: 'find_all_orders' }, orderPaginationDto)
      )

      return orders;

    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {

    try {
      const order = await firstValueFrom(
        this.client.send({ cmd: 'find_one_order' }, { id: id })
      )

      return order;

    } catch (error) {
      
      throw new RpcException(error)

    }

  }

  @Patch('change-status/:id')
  changeStatusOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ) {
    try {
      return this.client.send({ cmd: 'change_order_status' }, { id: id, status: statusDto.status })
    } catch (error) {
      throw new RpcException(error)
    }
  }

}
