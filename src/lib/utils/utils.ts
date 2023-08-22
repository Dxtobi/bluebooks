export const serializeNonPOJOs = (/** @type {any} */ obj: unknown) => {
    const f = JSON.stringify(obj);
    
    return JSON.parse(f)
     // return structuredClone(obj)
  }
  
  
  
  export function searchArray(array: string[], searchString: string) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === searchString) {
        return true;
      }
    }
    return false;
  }