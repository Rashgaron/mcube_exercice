import { bunOnTopAndBottom, checkCheeseDirectlyAboveBeef, checkLetuceBelowABun, checkSameTopAndBottom, isBurgerValid, isVegetarian, neverUseTheSameIngredientOnTopOfAnother, noBunsStacked} from './checker'
import { TYPES, CLASSIC_BUNS, ITEMS, DARK_BUNS } from '../constants/burger'

const nonVegetarianValidBurger =[
      { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_BOTTOM },
      { type: TYPES.INGREDIENT, item: ITEMS.TOMATOES },
      { type: TYPES.INGREDIENT, item: ITEMS.BEEF },
      { type: TYPES.INGREDIENT, item: ITEMS.LETTUCE },
      { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_TOP }
    ]

describe('isBurgerValid', () => {
  it('Valid burger', () => {
    expect(isBurgerValid(nonVegetarianValidBurger)).toBe(true)
  })
  it("Is Vegetarian", () => {
    const burger = [
      { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_BOTTOM },
      { type: TYPES.INGREDIENT, item: ITEMS.TOMATOES },
      { type: TYPES.INGREDIENT, item: ITEMS.LETTUCE },
      { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_TOP }
    ]

    expect(isVegetarian(burger)).toBe(true)
  })
  it("Should be valid if there is top and bottom", () => {
    expect(bunOnTopAndBottom(nonVegetarianValidBurger)).toBe(true)
  })
  it("Should be valid if there are different top and bottom", () => {
    expect(checkSameTopAndBottom(nonVegetarianValidBurger)).toBe(true)
  })
})

describe("isNotBurgerValid", () => {
    it("Should be no valid if there is an empty burger", () => {
      const burger = [];
      expect(bunOnTopAndBottom(burger)).toBe(false);
    })
    it("Should be not valid if there is no top", () => {
      const burger = [
        { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_BOTTOM },
        { type: TYPES.INGREDIENT, item: ITEMS.TOMATOES },
        { type: TYPES.INGREDIENT, item: ITEMS.LETTUCE },
      ]
      expect(bunOnTopAndBottom(burger)).toBe(false);
    })
    it("Should be not valid if there is no bottom", () => {
      const burger = [
        { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_TOP},
        { type: TYPES.INGREDIENT, item: ITEMS.TOMATOES },
        { type: TYPES.INGREDIENT, item: ITEMS.LETTUCE },
      ]
      expect(bunOnTopAndBottom(burger)).toBe(false);
    })
    it("Should not be valid if top and bottom are not the same", () => {
      const burger = [
        { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_TOP},
        { type: TYPES.INGREDIENT, item: ITEMS.TOMATOES },
        { type: TYPES.INGREDIENT, item: ITEMS.LETTUCE },
        { type: TYPES.BUN, item: DARK_BUNS.DARK_BUN_BOTTOM},
      ]
      expect(checkSameTopAndBottom(burger)).toBe(false);
    })
    describe("Testing checkCheeseDirectlyAboveBeef", () => {
      it("Should be invalid if the condition is not fullfilled", () => {
        const burger =[
          { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_BOTTOM },
          { type: TYPES.INGREDIENT, item: ITEMS.CHEESE},
          { type: TYPES.INGREDIENT, item: ITEMS.BEEF },
          { type: TYPES.INGREDIENT, item: ITEMS.LETTUCE },
          { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_TOP }
        ]
        expect(checkCheeseDirectlyAboveBeef(burger)).toBe(false);
      })
    })
    describe("Testing checkLetueBelowABun", () => {
      it("Should be invalid if the letuce is not below a bun", () => {
        const burger =[
          { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_BOTTOM },
          { type: TYPES.INGREDIENT, item: ITEMS.CHEESE},
          { type: TYPES.INGREDIENT, item: ITEMS.BEEF },
          { type: TYPES.INGREDIENT, item: ITEMS.LETTUCE },
          { type: TYPES.INGREDIENT, item: ITEMS.BEEF },
          { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_TOP }
        ]
        expect(checkLetuceBelowABun(burger)).toBe(false);
      })
    })

    describe("Testing noBunsStacked", () => {
      it("Should be invalid if there are two buns stacked", () => {
        const burger =[
          { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_BOTTOM },
          { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_BOTTOM },
          { type: TYPES.INGREDIENT, item: ITEMS.TOMATOES },
          { type: TYPES.INGREDIENT, item: ITEMS.BEEF },
          { type: TYPES.INGREDIENT, item: ITEMS.LETTUCE },
          { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_TOP }
        ]
        expect(noBunsStacked(burger)).toBe(false);
      })
    })
    describe("Testing same ingredient" ,()=> {
      it("Should be invalid if there are two same ingredients on top of another", () => {
        const burger =[
          { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_BOTTOM },
          { type: TYPES.INGREDIENT, item: ITEMS.TOMATOES },
          { type: TYPES.INGREDIENT, item: ITEMS.TOMATOES },
          { type: TYPES.INGREDIENT, item: ITEMS.BEEF },
          { type: TYPES.INGREDIENT, item: ITEMS.LETTUCE },
          { type: TYPES.BUN, item: CLASSIC_BUNS.CLASSIC_BUN_TOP }
        ]
        expect(neverUseTheSameIngredientOnTopOfAnother(burger)).toBe(false);
      })
    })
    describe("Testing isVegetarian", () => {
      it("Should be envalid if the burger is not vegetarian", () => {
        expect(isVegetarian(nonVegetarianValidBurger)).toBe(false);
      })
    })
})
