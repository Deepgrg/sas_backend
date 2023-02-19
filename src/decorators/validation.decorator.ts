import { RuntimeException } from '@exceptions/runtime.exception';
import { RequestContext } from '@mikro-orm/core';
import { HttpStatus } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const ValidateIfDuplicate = (
  input: {
    table: string;
    column: string;
  },
  validationOptions?: ValidationOptions,
) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'validateIfDuplicate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [input],
      validator: ValidateIfDuplicateConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'validateIfDuplicate', async: true })
class ValidateIfDuplicateConstraint implements ValidatorConstraintInterface {
  async validate(
    data,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    // returns constraints passed to the decorator
    // example: {table: string, column: string}
    const sqlConstraints = validationArguments.constraints[0];
    const { table, column } = sqlConstraints;

    // validate against database
    const res = await RequestContext.getEntityManager()
      .getConnection()
      .execute(`select count(*) as ok from ${table} where ${column} = ?;`, [
        data,
      ]);

    if (res[0].ok === '0') {
      return true;
    }

    // check if the data belongs to the same record
    const myObject: any = validationArguments.object;
    if (myObject.id || myObject.userId) {
      const result = await RequestContext.getEntityManager()
        .getConnection()
        .execute(`select * from ${table} where ${column} = ?;`, [data]);

      const entity = result[0];

      if (entity?.id == myObject.id) return true;
      if (entity?.userId == myObject.userId) return true;
    }

    // throw duplicate exception
    throw new RuntimeException(
      HttpStatus.BAD_REQUEST,
      `${validationArguments.property}: ${validationArguments.value} already exists`,
    );
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.value} already exists`;
  }
}

export const ValidateIfExists = (
  input: {
    table: string;
    column: string;
  },
  validationOptions?: ValidationOptions,
) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'validateIfExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [input],
      validator: ValidateIfExistsConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'validateIfExists', async: true })
class ValidateIfExistsConstraint implements ValidatorConstraintInterface {
  async validate(
    data,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    // returns constraints passed to the decorator
    // example: {table: string, column: string}
    const sqlConstraints = validationArguments.constraints[0];

    // validate against database
    const res = await RequestContext.getEntityManager()
      .getConnection()
      .execute(
        `select count(*) as ok from ${sqlConstraints.table} where ${sqlConstraints.column} = ?;`,
        [data],
      );

    if (res[0].ok === '0') {
      throw new RuntimeException(
        HttpStatus.BAD_REQUEST,
        `${validationArguments.property}: ${validationArguments.value} doesnot exists`,
      );
    } else {
      return true;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Given data: - ${validationArguments.value} - doesnot exists`;
  }
}

export const ValidateArrayIfExists = (
  input: {
    table: string;
    column: string;
  },
  validationOptions?: ValidationOptions,
) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'validateIfExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [input],
      validator: ValidateArrayIfExistsConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'validateIfExists', async: true })
class ValidateArrayIfExistsConstraint implements ValidatorConstraintInterface {
  async validate(
    data,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    // returns constraints passed to the decorator
    // example: {table: string, column: string}
    const sqlConstraints = validationArguments.constraints[0];
    return true; // TODO
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Given data: - ${validationArguments.value} - doesnot exists`;
  }
}
