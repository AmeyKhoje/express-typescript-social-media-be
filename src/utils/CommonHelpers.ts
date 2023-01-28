import { ValidationError } from 'class-validator';
import { Request } from 'express';
import DataStoredInToken from 'interfaces/DataStoredInToken.interface';
import { verify } from 'jsonwebtoken';
import { Document } from 'mongoose';
require('dotenv').config();

export const isCamelCase = (word: string) => {
  const str = word.replace(
    /([^\p{L}\d]+|(?<=\p{L})(?=\d)|(?<=\d)(?=\p{L})|(?<=[\p{Ll}\d])(?=\p{Lu})|(?<=\p{Lu})(?=\p{Lu}\p{Ll})|(?<=[\p{L}\d])(?=\p{Lu}\p{Ll}))/gu,
    '-'
  );
  const splitted = str.split('-');
  const firstLetter = splitted[0].split('')[0];
  const isFirstLetterSmall = firstLetter === firstLetter.toLowerCase();
  let capitalCount = 0;

  splitted.forEach((letter, index) => {
    if (index > 0) {
      const letterStr = letter.split('')[0];
      const isCapital = letterStr === letterStr.toUpperCase();

      isCapital ? ++capitalCount : null;
    }
  });

  if (isFirstLetterSmall) {
    if (splitted.length > 1 && splitted.length - 1 === capitalCount) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

export const getErrorMessageSimplified = (errors: ValidationError[]) => {
  const finalErrors = errors.map((error: ValidationError) => {
    const camelCaseField = isCamelCase(error.property);
    let fieldName: string | string[] = '';
    if (camelCaseField) {
      fieldName = error.property
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .split(' ')
        .map((item: string, index: number) => {
          if (index === 0) {
            return item.charAt(0).toUpperCase() + item.slice(1);
          } else {
            return item.charAt(0).toLowerCase() + item.slice(1);
          }
        })
        .join(' ');
    } else {
      fieldName =
        error.property.charAt(0).toUpperCase() + error.property.slice(1);
    }

    const messages = Object.values(error.constraints || {}).map(
      (item: string) => {
        const firstWord = item.split(' ')[0];
        const otherWords = item.split(' ').slice(1);
        let firstWordFinal = '';
        if (isCamelCase(firstWord)) {
          firstWordFinal = firstWord
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
            .split(' ')
            .map((item: string, index: number) => {
              if (index === 0) {
                return item.charAt(0).toUpperCase() + item.slice(1);
              } else {
                return item.charAt(0).toLowerCase() + item.slice(1);
              }
            })
            .join(' ');
        } else {
          firstWordFinal = firstWord.charAt(0).toUpperCase() + item.slice(1);
        }

        return [firstWordFinal, ...otherWords].join(' ');
      }
    );
    return {
      fieldName,
      messages,
    };
  });

  return finalErrors;
};

export const getArrayFromString = (
  strValue: string,
  splitValue: string = ' '
): string[] => {
  return strValue.split(splitValue);
};
