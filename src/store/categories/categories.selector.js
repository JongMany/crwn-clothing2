import { createSelector } from "reselect";

//categories reducer를 가져오는 selector
const selectCategoryReducer = (state) => state.categories;

//categories reducer의 categories 속성값을 가져오는 selector
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categories) => categories.categories
);

//categories의 배열을 객체로 변환하는 selector
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category, i) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading,
)
/* export const selectCategoriesMap = ({ categories: { categories } }) =>{
  console.log('selector fired');
  return categories.reduce((acc, category, i) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
} */
