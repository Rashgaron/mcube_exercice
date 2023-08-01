// Burger object
//
// { type: 'TYPE', item: 'ITEM' }
//
// Golden rules of a burger
//
// 1 - Bun on top and bottom
// 2 - Use the same type of bun
// 3 - The cheese should always be above the beef
// 4 - The lettuce should always be below a bun
// 5 - Never stack two buns on top of another
// 6 - Never use the same ingredient on top of another
//
// Optional rule
//
// 1 - Vegetarian (contains no beef or bacon)
//

import { TYPES, ITEMS, DARK_BUNS, CLASSIC_BUNS, INGREDIENTS, BUNS } from '../constants/burger'

export const isBurgerValid = burger => {
  return bunOnTopAndBottom(burger) &&
  checkSameTopAndBottom(burger) &&
  checkCheeseDirectlyAboveBeef(burger) &&
  checkLetuceBelowABun(burger) &&
  noBunsStacked(burger) &&
  neverUseTheSameIngredientOnTopOfAnother(burger)
}

const hasMinimumLength = burger => burger.length >= 2;

export const bunOnTopAndBottom = burger => {
  if(hasMinimumLength(burger)){
    const bottomItem = burger[0];
    const topItem = burger[burger.length - 1];
    return topItem.type === TYPES.BUN && bottomItem.type === TYPES.BUN;
  } else return false
}

export const checkSameTopAndBottom = burger => {
  if(bunOnTopAndBottom(burger)){
    const bottomItem = burger[0];
    const topItem = burger[burger.length - 1];
    const keys = Object.keys(BUNS);
    const index = keys.findIndex((item) => item === bottomItem.item );
    return keys[index-1] === topItem.item;
  }
  return true;
}

export const checkCheeseDirectlyAboveBeef = burger => {
  if(burger.length >= 1 ) {
    let valid = true;
    burger.map((item, index) => {
      if(index === 0 && item.item === ITEMS.CHEESE) {valid = false; return};
      if(index !== 0 && item.item === ITEMS.CHEESE && burger[index -1].item !== ITEMS.BEEF){
        valid = false;
        return;
      }
    })
    return valid;
  }
  return true;
}

export const checkLetuceBelowABun = burger => {
  if(burger.length >= 2) {
    let valid = true;
    burger.map((item, index) => {
      if(index != burger.length-1 && item.item === ITEMS.LETTUCE && burger[index+1].type !== TYPES.BUN) {
        valid = false;
        return;
      }
    })
    return valid;
  }
  return true;
}

export const noBunsStacked = burger => {
  if(burger.length >= 2) {
    let valid = true;
    burger.map((item, index) => {
      if(index != burger.length-1 && item.type === TYPES.BUN && burger[index+1].type === TYPES.BUN) {
        valid = false;
        return;
      }
    })
    return valid;
  }
  return true;
}

export const neverUseTheSameIngredientOnTopOfAnother = burger => {
  if(burger.length >= 2) {
    let valid = true;
    burger.map((item, index) => {
      if(index != burger.length-1 && item.item === burger[index+1].item) {
        valid = false;
        return;
      }
    })
    return valid;
  }
  return true;
}

export const isVegetarian = burger => {
  return !burger.find((item) => item.item === INGREDIENTS.BEEF || item.item === INGREDIENTS.BACON);

}
