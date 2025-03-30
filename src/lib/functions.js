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