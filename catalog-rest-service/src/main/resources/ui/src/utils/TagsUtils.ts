import { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import { flatten } from 'lodash';
import { ColumnTags, TableColumn } from 'Models';
import { getCategory, getTags } from '../axiosAPIs/tagAPI';
import { TagsCategory } from '../pages/tags/tagsTypes';

export const getTagCategories = async (fields?: Array<string> | string) => {
  try {
    let listOfCategories: Array<TagsCategory> = [];
    const categories = await getTags(fields);
    const categoryList = categories.data.data.map((category: TagsCategory) => {
      return {
        name: category.name,
        description: category.description,
      };
    });
    if (categoryList.length) {
      let promiseArr: Array<AxiosPromise> = [];
      promiseArr = categoryList.map((category: TagsCategory) => {
        return getCategory(category.name, fields);
      });

      await Promise.allSettled(promiseArr).then(
        (res: PromiseSettledResult<AxiosResponse>[]) => {
          if (res.length) {
            listOfCategories = res
              .filter((category) => category.status === 'fulfilled')
              .map((category) => {
                return (category as PromiseFulfilledResult<AxiosResponse>).value
                  ?.data;
              });
          }
        }
      );
    }

    return Promise.resolve({ data: listOfCategories });
  } catch (error) {
    return Promise.reject({ data: (error as AxiosError).response });
  }
};

export const getTaglist = (categories: Array<TagsCategory>): Array<string> => {
  const children = categories.map((category: TagsCategory) => {
    return category.children || [];
  });
  const allChildren = flatten(children);
  const tagList = allChildren?.map((tag) => {
    return tag?.fullyQualifiedName;
  });

  return tagList;
};

export const getTableTags = (
  columns: Array<Partial<TableColumn>>
): Array<ColumnTags> => {
  const flag: { [x: string]: boolean } = {};
  const uniqueTags: Array<ColumnTags> = [];
  const tags = columns
    .map((column) => column.tags || [])
    .reduce((prev, curr) => prev.concat(curr), [])
    .map((tag) => tag);

  tags.forEach((elem) => {
    if (!flag[elem.tagFQN]) {
      flag[elem.tagFQN] = true;
      uniqueTags.push(elem);
    }
  });

  return uniqueTags;
};
