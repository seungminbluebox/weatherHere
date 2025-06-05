export function applyBackgroundTheme(sunsetUnix, sunriseUnix) {
  const now = Date.now(); // 현재 시각 (ms)

  const sunrise = new Date(sunriseUnix * 1000);
  sunrise.setHours(sunrise.getHours()); // UTC → KST

  const sunset = new Date(sunsetUnix * 1000);
  sunset.setHours(sunset.getHours()); // UTC → KST

  const sunriseMs = sunrise.getTime();
  const sunsetMs = sunset.getTime();

  const isDaytime = now >= sunriseMs && now < sunsetMs;
  // console.log("현재 시각:", new Date(now));
  // console.log("일출 시각:", sunrise);
  // console.log("일출 시각:", sunriseMs);
  // console.log("일몰 시각:", sunset);
  // console.log("일몰 시각:", sunsetMs);
  // console.log("낮 여부:", isDaytime ? "낮" : "밤");

  const root = document.documentElement;

  if (isDaytime) {
    // ☀️ 낮 테마
    root.style.setProperty(
      "--bg-gradient",
      "linear-gradient(to bottom, #a2d5f2, #ffffff)"
    );
    root.style.setProperty("--font-color", "black");
    root.style.setProperty("--tooltip-bg", "rgba(255, 255, 255, 0.95)	");
  } else {
    // 🌙 밤 테마
    root.style.setProperty(
      "--bg-gradient",
      "linear-gradient(to bottom, #1e1e30, #3c3c5a)"
    );
    root.style.setProperty("--font-color", "#d0ccff");
    root.style.setProperty("--tooltip-bg", "rgba(50, 50, 70, 0.95)	");
  }
}
