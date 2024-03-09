import { formatDateDistance } from "@/utils/time";

describe("utils/time", () => {
  describe("formatDateDistance", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2021-01-01T10:00:00"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test("24時間以内の場合、○時間前に変換される", () => {
      const date = new Date("2021-01-01T09:00:00");
      const distance = formatDateDistance(date);

      expect(distance).toBe("約1時間前");

      const date2 = new Date("2021-01-01T09:30:00");

      const distance2 = formatDateDistance(date2);

      expect(distance2).toBe("30分前");
    });

    test("24時間以上の場合、○日前に変換される", () => {
      const date = new Date("2020-12-31T10:00:00");
      const distance = formatDateDistance(date);

      expect(distance).toBe("1日前");

      const date2 = new Date("2020-12-30T10:00:00");
      const distance2 = formatDateDistance(date2);

      expect(distance2).toBe("2日前");
    });

    test("30日以上の場合、○ヶ月前に変換される", () => {
      const date = new Date("2020-12-01T10:00:00");
      const distance = formatDateDistance(date);

      expect(distance).toBe("約1か月前");

      const date2 = new Date("2020-11-01T10:00:00");
      const distance2 = formatDateDistance(date2);

      expect(distance2).toBe("2か月前");
    });

    test("1年以上の場合、○年前に変換される", () => {
      const date = new Date("2020-01-01T10:00:00");
      const distance = formatDateDistance(date);

      expect(distance).toBe("約1年前");

      const date2 = new Date("2019-01-01T10:00:00");
      const distance2 = formatDateDistance(date2);

      expect(distance2).toBe("約2年前");
    });
  });
});
