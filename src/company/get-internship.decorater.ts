import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Internship } from 'src/internship/Internship.entity';

export const GetIntership = createParamDecorator(
  (_data, ctx: ExecutionContext): Internship => {
    const req = ctx.switchToHttp().getRequest();
    return req.internship;
  },
);
