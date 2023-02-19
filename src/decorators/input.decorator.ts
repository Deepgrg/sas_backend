import { Transform } from 'class-transformer';

export const ToUpperCase = () => {
  return Transform((params) => {
    return params?.value?.toUpperCase().trim();
  }, {});
};

export const ToLowerCase = () => {
  return Transform((params) => params?.value?.toLowerCase());
};

export const ToTrimmed = () => {
  return Transform((params) => params?.value?.trim());
};

export function ToBoolean(): (target: any, key: string) => void {
  return Transform((value: any) => {
    value = value.value;
    return value === 'true' || value === true || value === 1 || value === '1';
  });
}

export function ToNumber(): (target: any, key: string) => void {
  return Transform((value: any) => {
    value = value.value;
    return Number(value);
  });
}

export function MapToNumber(): (target: any, key: string) => void {
  return Transform((value: any) => {
    value = value.value;
    return value === 'FIRST'
      ? 1
      : value === 'SECOND'
      ? 2
      : value === 'THIRD'
      ? 3
      : value === 'FOURTH'
      ? 4
      : null;
  });
}

export function ParseToArray(): (target: any, key: string) => void {
  return Transform((value: any) => {
    value = value.value;
    return JSON.parse(value);
  });
}
