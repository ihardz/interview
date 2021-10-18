
//to run the solution? please run the following command:
//node interview.js
//*nodejs should be installed on your machine.

class NumberRange {
  constructor(from, to){
    const numberType = typeof Number();
    if((typeof from !== numberType) || (typeof to !== numberType)) {
      throw new Error('Invalid argument type.');
    }
    if(from > to) {
      throw new Error('Invalid range.');
    }
    this.from = from;
    this.to = to;
  }

  unite(numberRange){
    this.from = Math.min(this.from,numberRange.from);
    this.to = Math.max(this.to,numberRange.to);
  }
}

const MATCH_PATTERN_SEPARATOR = ',';
const MATCH_PATTERN_RANGE_SEPARATOR = '-';

class Helper {
  static countMatches(list, pattern) {
    if(!Array.isArray(list)){
      throw new Error('Invalid argument type.');
    }
    if(typeof pattern !== typeof String()) {
      throw new Error('Invalid argument type.');
    }
    let  ranges = Helper._parsePatternToRanges(pattern);
    ranges = Helper._uniteRanges(ranges).filter(Boolean);

    console.log(ranges);
    const result = list.reduce((acc, item)=>{
      console.log('item', item);
      const range = ranges.find(x => (x.from <= item) && (x.to >= item));
      if(range){
        acc++;
      }
      console.log('acc', acc);

      return acc;
    }, 0);
    return result;
  }

  static _uniteRanges(ranges){
    const rangesCount = ranges.length;    
    for (let i = 0; i < rangesCount; i++) {
      const current = ranges[i];
      if(!current){
        continue;
      }
      for (let j = 0; j < rangesCount; j++) {
        const target = ranges[j];
        if(target === current || !target) {
          continue;
        }
        if (
          (current.to >= target.from && current.from <= target.to) || 
          (target.to >= current.from && target.from <= current.to)
        ){
          current.unite(target);
          ranges[j] = null;
        }
      }
    }
    return ranges;
  }

  static _parsePatternToRanges(patternString) {
    const patternNormalized = patternString.replace(/ /g, String());
    const patternStrings = patternNormalized.split(MATCH_PATTERN_SEPARATOR);
    const ranges = patternStrings.map(Helper._parsePatternItem);
    return ranges;
  }

  static _parsePatternItem(patternItemString) {
    const itemAsArray = patternItemString.split(MATCH_PATTERN_RANGE_SEPARATOR);

    if(!itemAsArray.length){
      throw new Error(`Invalid pattern: Empty`);
    }
    if(itemAsArray.length < itemAsArray.filter(Boolean).length) {
      throw new Error(`Invalid pattern: ${patternItemString}`);
    }

    const from = Number(itemAsArray[0]);
    const to = Number(itemAsArray[1] || itemAsArray[0]);
    const range = new NumberRange(from, to);
    return range;
  }
}


let list = [5,4,3,1,9,5,9,6,3];

const count = Helper.countMatches(list, '3-5, 7-9, 12');
console.log(count);



