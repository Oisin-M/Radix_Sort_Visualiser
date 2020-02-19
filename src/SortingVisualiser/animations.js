export function getLSDAnimations(array) {
  const animations = [];
  radixSortLSD(array, animations);
  return animations;
}

export function getLSDAnimations_base(n, array) {
  const animations = [];
  radixSortLSD_base(n, array, animations);
  return animations;
}

function radixSortLSD(arr, animations) {
   // Find the max number and multiply it by 10 to get a number
   // with no. of digits of max + 1
   const maxNum = Math.max(...arr) * 10;
   let divisor = 10;
   while (divisor < maxNum) {
      // Create bucket arrays for each of 0-9
      let buckets = [...Array(10)].map(() => []);
      // For each number, get the current significant digit and put it in the respective bucket
      for (let i = 0; i < arr.length; i++) {
         let num=arr[i];
         buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);
      }
      console.log(buckets);
      // Reconstruct the array by concatinating all sub arrays
      arr = [].concat.apply([], buckets);
      // Move to the next significant digit
      animations.push(arr); //push the list sorted by last digit
      divisor *= 10;
   }
   return arr;
}

function radixSortLSD_base(n, arr, animations) {
  let n_arr=convert_to_base(n, arr);
   // Find the max number and multiply it by 10 to get a number
   // with no. of digits of max + 1
   const maxNum = Math.max(...n_arr) * 10;
   let divisor = 10;
   console.log(divisor);
   while (divisor < maxNum) {
      // Create bucket arrays for each of 0-9
      let n_buckets = [...Array(10)].map(() => []);
      let buckets = [...Array(10)].map(() => []);
      // For each number, get the current significant digit and put it in the respective bucket
      for (let i = 0; i < n_arr.length; i++) {
        let num = n_arr[i];
        console.log(num);
         n_buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);
         buckets[Math.floor((num % divisor) / (divisor / 10))].push(arr[i]);
      }
      console.log(n_buckets);
      console.log(buckets);
      // Reconstruct the array by concatinating all sub arrays
      arr = [].concat.apply([], buckets);
      n_arr = [].concat.apply([], n_buckets);
      // Move to the next significant digit
      animations.push(arr); //push the list sorted by last digit
      divisor *= 10;
      console.log(divisor);
   }
   return arr;
}

function convert_to_base(n, arr) {
  const new_arr = [];
  for (let num of arr) {
    let new_num=parseInt(num.toString(n));
    new_arr.push(new_num);
  }
  return new_arr;
}
