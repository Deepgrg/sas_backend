import { EventArgs, EventSubscriber, RequestContext } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MikroEntitySubscriber implements EventSubscriber {
  async beforeCreate(args: EventArgs<any>) {
    const userId = RequestContext.currentRequestContext().map.get('userId');
    if (userId) args.entity.createdBy = userId;
  }

  async beforeUpdate(args: EventArgs<any>) {
    const userId = RequestContext.currentRequestContext().map.get('userId');
    if (userId) args.entity.updatedBy = userId;
  }
}
