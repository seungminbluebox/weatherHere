export function createTooltip() {
  const infoButton = document.querySelector(".info-button");

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip-box";
  tooltip.innerHTML = `
  <strong class='infoTitle' style="display:block; margin-bottom: 8px;">📊 수치별 위험도 안내</strong>
  <div class="tooltip-table">
    <div class="tooltip-col">
      <div class="tooltip-title">미세먼지 (PM10)</div>
      <div class="tooltip-row">
        <div class="first">0~30: 좋음</div>
        <span>공기 맑음</span>
      </div>
      <div>
        <div class="second">31~80: 보통</div>
        <span>보통 수준, 민감군은 주의</span>
      </div>
      <div>
        <div class="third">81~150: 나쁨</div>
        <span>외출 시 마스크 착용 권장</span>
      </div>
      <div>
        <div class="fourth">151+: 매우 나쁨</div>
        <span>가급적 실내 활동 권장</span>
      </div>
    </div>
    <div class="tooltip-col">
      <div class="tooltip-title">초미세먼지 (PM2.5)</div>
      <div>
        <div class="first">0~15: 좋음</div>
        <span>공기 맑음</span>
      </div>
      <div>
        <div class="second">16~35: 보통</div>
        <span>보통 수준, 민감군은 주의</span>
      </div>
      <div>
        <div class="third">36~75: 나쁨</div>
        <span>외출 시 마스크 착용 권장</span>
      </div>
      <div>
        <div class="fourth">76+: 매우 나쁨</div>
        <span>가급적 실내 활동 권장</span>
      </div>
    </div>
    <div class="tooltip-col">
      <div class="tooltip-title">자외선지수 (UVI)</div>
      <div>
        <div class="first">0~2: 낮음</div>
        <span>안심하고 야외활동 가능</span>
      </div>
      <div>
        <div class="second">3~5: 보통</div>
        <span>장시간 노출 시 자외선 차단제 권장</span>
      </div>
      <div>
        <div class="third">6~7: 높음</div>
        <span>자외선 차단제, 모자 등 보호 필요</span>
      </div>
      <div>
        <div class="fourth">8~10: 매우 높음</div>
        <span>외출 시 각별한 주의 필요</span>
      </div>
      <div>
        <div class="fifth">11+: 위험</div>
        <span>가급적 실내 활동 권장</span>
      </div>
    </div>
  </div>
`;
  document.body.appendChild(tooltip);

  infoButton.addEventListener("click", () => {
    const rect = infoButton.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top + 50}px`; // 기본 위치
    tooltip.style.transform = "translate(5%, -98%)"; // 위쪽으로 정렬
    tooltip.style.display = "block";
  });

  // 툴팁 외부 클릭 시 툴팁 닫기
  document.addEventListener("mousedown", (event) => {
    if (!tooltip.contains(event.target) && !infoButton.contains(event.target)) {
      tooltip.style.display = "none";
    }
  });
}
