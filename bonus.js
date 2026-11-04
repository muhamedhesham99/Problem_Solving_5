const removeElement = (nums, val) => {
  if (nums.length < 0 || nums.length > 100) {
    return { error: "Invalid array length" };
  }

  const hasInvalidNumber = nums.some((num) => num < 0 || num > 50);

  if (hasInvalidNumber) {
    return { error: "0 <= nums[i] <= 50" };
  }

  const numsAfterRemoveElement = nums.filter((num) => num !== val);

  return {
    k: numsAfterRemoveElement.length,
    nums: numsAfterRemoveElement,
  };
};

const nums = [0, 1, 2, 2, 3, 0, 4, 2];
const val = 2;

console.log(removeElement(nums, val));
