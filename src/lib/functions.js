export function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export const disableScroll = () => {
  document.querySelector('html').style.overflow = 'hidden';
};

export const enableScroll = () => {
  document.querySelector('html').style.removeProperty('overflow');
};

export const show = (el, display = 'block') => {
  el.style.display = display;
};

export const hide = (el) => {
  el.style.display = 'none';
};

export const toggle = (el) => {
  if (el.style.display == "none")
    show(el);
  else
    hide(el);
};

export const toggleClass = (el, css) => {
  if (!el.classList.contains(css)) {
    el.classList.add(css);
  } else {
    el.classList.remove(css);
  }
};

export const fadeIn = async (el, display = 'block', transition = 2000, up = false) => {
  if (el) {
    if (el.style.display == 'none') {
      el.style.opacity = "0";
      show(el, display);
      await wait(100);
    }

    if (el.classList.contains('hidden')) {
      el.style.opacity = "0";
      el.classList.remove('hidden');
      await wait(100);
    }

    if (up) {
      el.style.transform = "translateY(20px)";
      await wait(100);
      el.style.transition = "opacity " + transition + "ms, transform " + transition + "ms";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    } else {
      el.style.transition = "opacity " + transition + "ms";
      el.style.opacity = "1";
    }
  }
};

export const fadeOut = async (el, transition = 2000, down = false) => {
  if (el) {
    if (down) {
      el.style.transform = "translateY(0)";
      await wait(100);
      el.style.transition = "opacity " + transition + "ms, transform " + transition + "ms";
      el.style.opacity = "0";
      el.style.transform = "translateY(25px)";
    } else {
      el.style.transition = "opacity " + transition + "ms";
      el.style.opacity = "0";
    }
    await wait(transition);
    hide(el);
  }
};

export function findMin(arr) {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }
  let min = arr[0]; // 배열의 첫 번째 요소를 최소값으로 초기화
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}

export function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // 최댓값은 제외, 최솟값은 포함
}

export function getTrueRandom() {
  const randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);
  const randomFloat = randomArray[0] / 0xFFFFFFFF;
  return randomFloat;
}

export function getTrueRandomInt(min, max) {
  const range = max - min;
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return min + (array[0] % range);
}

export function getRandomIndex(array) {
  if (array.length === 0) {
    throw new Error("Array must not be empty");
  }

  const randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);
  const randomValue = randomArray[0];
  const randomIndex = randomValue % array.length;

  return array[randomIndex];
}

export function getRandomValue(probabilities) {
  const totalProbability = probabilities.reduce((sum, item) => sum + item.probability, 0);
  const random = getTrueRandom() * totalProbability;
  let cumulativeProbability = 0;

  for (const item of probabilities) {
    cumulativeProbability += item.probability;
    if (random <= cumulativeProbability) {
      return item.value;
    }
  }
}

export function getArmSleeveColor(team) {
  switch (team) {
    case "KIA":
      return "빨간색";
    case "해태":
      return "빨간색";
    case "SK":
      return "빨간색";
    case "SSG":
      return "빨간색";
    case "삼성":
      return "파란색";
    case "LG":
      return "검은색";
    case "MBC":
      return "검은색";
    case "롯데":
      return "검은색";
    case "한화":
      return "검은색";
    case "kt":
      return "검은색";
    case "삼미":
      return "검은색";
    case "두산":
      return "남색";
    case "OB":
      return "남색";
    case "NC":
      return "남색";
    case "넥센":
      return "버건디";
    case "키움":
      return "버건디";
    case "현대":
      return "버건디";
    default:
      console.log(team);
      return "오류";
  }
}

export function getSkillColor(skill) {
  switch (skill) {
    case "아마추어":
      return "#6b7280";
    case "루키":
      return "#16a34a";
    case "마이너":
      return "#0284c7";
    case "메이저":
      return "#d946ef";
    case "국가대표":
      return "#dc2626";
    default:
      console.log(skill);
      return "#000000";
  }
}