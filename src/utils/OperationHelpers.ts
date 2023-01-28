import { Request } from 'express';
import DataStoredInToken from 'interfaces/DataStoredInToken.interface';
import { verify } from 'jsonwebtoken';
import { getArrayFromString } from './CommonHelpers';

export const getTokenData = (request: Request) => {
  const cookies = request.cookies;

  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    const verificationResponse = verify(
      cookies.Authorization,
      secret
    ) as DataStoredInToken;

    const id = verificationResponse._id;

    return {
      data: id,
    };
  }
  return { data: null };
};

export const getSpecificFieldsFromDocument = (
  document: object,
  fields: string
): object => {
  const attributes: string[] = getArrayFromString(fields);

  let newObject = {};

  Object.keys(document).map((keyItem: string) => {
    Object.values(document).map((keyItemValue: any) => {
      const isPresent = attributes.find((item) => item === keyItem);

      if (isPresent) {
        newObject = {
          ...newObject,
          keyItem: keyItemValue,
        };
      }
    });
  });

  return newObject;
};
